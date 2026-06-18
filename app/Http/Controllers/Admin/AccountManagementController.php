<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AccountManagementController extends Controller
{
    private array $roles = [
        'super_admin' => 'Super Admin',
        'ppdb_admin' => 'Admin PPDB',
        'osis_admin' => 'Admin OSIS',
        'extracurricular_admin' => 'Admin Ekstrakurikuler',
    ];

    public function index(Request $request): Response
    {
        $this->authorizeSuperAdmin($request);

        $search = trim((string) $request->query('search', ''));
        $role = $request->query('role', 'all');

        $accounts = User::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($builder) use ($search) {
                    $builder
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($role !== 'all', function ($query) use ($role) {
                $query->where('role', $role);
            })
            ->orderByRaw("FIELD(role, 'super_admin', 'ppdb_admin', 'osis_admin', 'extracurricular_admin')")
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $user) => $this->accountPayload($user, $request));

        return Inertia::render('Admin/Accounts/Index', [
            'accounts' => $accounts,
            'filters' => [
                'search' => $search,
                'role' => $role,
            ],
            'roles' => $this->roles,
            'summary' => [
                'total' => User::query()->count(),
                'super_admin' => User::query()->where('role', 'super_admin')->count(),
                'ppdb_admin' => User::query()->where('role', 'ppdb_admin')->count(),
                'osis_admin' => User::query()->where('role', 'osis_admin')->count(),
                'extracurricular_admin' => User::query()->where('role', 'extracurricular_admin')->count(),
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorizeSuperAdmin($request);

        return Inertia::render('Admin/Accounts/Create', [
            'roles' => $this->roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorizeSuperAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', Rule::in(array_keys($this->roles))],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ], [
            'name.required' => 'Nama akun wajib diisi.',
            'email.required' => 'Email akun wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan akun lain.',
            'role.required' => 'Role akun wajib dipilih.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak sama.',
        ]);

        User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()
            ->route('admin.accounts.index')
            ->with('success', 'Akun admin berhasil ditambahkan.');
    }

    public function edit(Request $request, User $account): Response
    {
        $this->authorizeSuperAdmin($request);

        return Inertia::render('Admin/Accounts/Edit', [
            'account' => $this->accountPayload($account, $request),
            'roles' => $this->roles,
        ]);
    }

    public function update(Request $request, User $account): RedirectResponse
    {
        $this->authorizeSuperAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($account->id)],
            'role' => ['required', Rule::in(array_keys($this->roles))],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'],
        ], [
            'name.required' => 'Nama akun wajib diisi.',
            'email.required' => 'Email akun wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan akun lain.',
            'role.required' => 'Role akun wajib dipilih.',
            'password.min' => 'Password minimal 6 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak sama.',
        ]);

        if ($request->user()?->id === $account->id && $validated['role'] !== 'super_admin') {
            return back()->with('error', 'Akun yang sedang login tidak boleh menurunkan role sendiri.');
        }

        if ($account->role === 'super_admin' && $validated['role'] !== 'super_admin' && $this->isLastSuperAdmin($account)) {
            return back()->with('error', 'Minimal harus ada satu akun Super Admin.');
        }

        $payload = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        if (! empty($validated['password'])) {
            $payload['password'] = Hash::make($validated['password']);
        }

        $account->update($payload);

        return redirect()
            ->route('admin.accounts.index')
            ->with('success', 'Akun admin berhasil diperbarui.');
    }

    public function destroy(Request $request, User $account): RedirectResponse
    {
        $this->authorizeSuperAdmin($request);

        if ($request->user()?->id === $account->id) {
            return back()->with('error', 'Akun yang sedang login tidak bisa menghapus dirinya sendiri.');
        }

        if ($account->role === 'super_admin' && $this->isLastSuperAdmin($account)) {
            return back()->with('error', 'Minimal harus ada satu akun Super Admin.');
        }

        $account->delete();

        return redirect()
            ->route('admin.accounts.index')
            ->with('success', 'Akun admin berhasil dihapus.');
    }

    private function accountPayload(User $user, Request $request): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'role_label' => $this->roles[$user->role] ?? 'Administrator',
            'created_at' => $user->created_at?->format('d M Y'),
            'is_current_user' => $request->user()?->id === $user->id,
            'can_delete' => $request->user()?->id !== $user->id && ! ($user->role === 'super_admin' && $this->isLastSuperAdmin($user)),
        ];
    }

    private function isLastSuperAdmin(User $user): bool
    {
        if ($user->role !== 'super_admin') {
            return false;
        }

        return User::query()->where('role', 'super_admin')->count() <= 1;
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        abort_unless($request->user()?->role === 'super_admin', 403);
    }
}
