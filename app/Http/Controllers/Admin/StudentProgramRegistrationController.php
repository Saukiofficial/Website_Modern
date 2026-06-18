<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProgramRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class StudentProgramRegistrationController extends Controller
{
    public function index(Request $request): Response
    {
        $type = $request->query('type', 'all');
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        /*
        |--------------------------------------------------------------------------
        | Auto Filter Berdasarkan Panel
        |--------------------------------------------------------------------------
        | Jika admin masuk dari /admin/osis, data otomatis OSIS.
        | Jika admin masuk dari /admin/ekstrakurikuler, data otomatis Ekstrakurikuler.
        | Super admin dari /admin/student-registrations tetap bisa lihat semua.
        */

        if ($request->is('admin/osis/*')) {
            $type = 'osis';
        }

        if ($request->is('admin/ekstrakurikuler/*')) {
            $type = 'extracurricular';
        }

        $this->authorizeIndexPanelAccess($type);

        $query = StudentProgramRegistration::query()
            ->latest('submitted_at')
            ->latest('id');

        if ($type !== 'all') {
            $query->where('registration_type', $type);
        }

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('registration_number', 'like', "%{$search}%")
                    ->orWhere('student_name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('program_title', 'like', "%{$search}%")
                    ->orWhere('approved_role', 'like', "%{$search}%");
            });
        }

        $registrations = $query
            ->paginate(15)
            ->withQueryString()
            ->through(fn (StudentProgramRegistration $registration) => $this->registrationPayload($registration));

        $summaryQuery = StudentProgramRegistration::query();

        if ($type !== 'all') {
            $summaryQuery->where('registration_type', $type);
        }

        $summary = [
            'total' => (clone $summaryQuery)->count(),
            'baru' => (clone $summaryQuery)->where('status', 'Baru')->count(),
            'diproses' => (clone $summaryQuery)->where('status', 'Diproses')->count(),
            'diterima' => (clone $summaryQuery)->where('status', 'Diterima')->count(),
            'ditolak' => (clone $summaryQuery)->where('status', 'Ditolak')->count(),
            'osis' => StudentProgramRegistration::query()->where('registration_type', 'osis')->count(),
            'extracurricular' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->count(),
            'counseling' => StudentProgramRegistration::query()->where('registration_type', 'counseling')->count(),
            'published' => (clone $summaryQuery)->where('publish_to_frontend', true)->count(),
        ];

        return Inertia::render('Admin/StudentRegistrations/Index', [
            'registrations' => $registrations,
            'filters' => [
                'type' => $type,
                'status' => $status,
                'search' => $search,
            ],
            'summary' => $summary,
            'panel' => $this->currentPanel($request),
        ]);
    }

    public function show(Request $request, StudentProgramRegistration $registration): Response
    {
        $this->authorizePanelAccess($registration);

        return Inertia::render('Admin/StudentRegistrations/Show', [
            'registration' => $this->registrationPayload($registration),
            'panel' => $this->currentPanel($request),
        ]);
    }

    public function update(Request $request, StudentProgramRegistration $registration): RedirectResponse
    {
        $this->authorizePanelAccess($registration);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['Baru', 'Diproses', 'Diterima', 'Ditolak'])],
            'admin_note' => ['nullable', 'string'],
            'approved_role' => ['nullable', 'string', 'max:255'],
            'publish_to_frontend' => ['nullable', 'boolean'],
        ]);

        $shouldAnnounce = in_array($validated['status'], ['Diterima', 'Ditolak'], true);

        $registration->update([
            'status' => $validated['status'],
            'admin_note' => $validated['admin_note'] ?? null,
            'approved_role' => $validated['approved_role'] ?? null,
            'publish_to_frontend' => (bool) ($validated['publish_to_frontend'] ?? false),
            'announced_at' => $shouldAnnounce ? ($registration->announced_at ?: now()) : null,
        ]);

        return redirect()
            ->to($this->showRedirectUrl($request, $registration))
            ->with('success', 'Status pendaftaran kesiswaan berhasil diperbarui.');
    }

    public function destroy(Request $request, StudentProgramRegistration $registration): RedirectResponse
    {
        $this->authorizePanelAccess($registration);

        $registration->delete();

        return redirect()
            ->to($this->indexRedirectUrl($request))
            ->with('success', 'Data pendaftaran kesiswaan berhasil dihapus.');
    }

    private function registrationPayload(StudentProgramRegistration $registration): array
    {
        return [
            'id' => $registration->id,
            'registration_number' => $registration->registration_number,
            'registration_type' => $registration->registration_type,
            'type_label' => $registration->type_label,
            'program_title' => $registration->program_title,
            'student_name' => $registration->student_name,
            'nisn' => $registration->nisn,
            'class_name' => $registration->class_name,
            'gender' => $registration->gender,
            'phone' => $registration->phone,
            'email' => $registration->email,
            'experience' => $registration->experience,
            'reason' => $registration->reason,
            'extra_data' => $registration->extra_data ?? [],
            'status' => $registration->status,
            'status_color' => $registration->status_color,
            'status_type' => $registration->status_type,
            'admin_note' => $registration->admin_note,
            'approved_role' => $registration->approved_role,
            'publish_to_frontend' => $registration->publish_to_frontend,
            'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
            'announced_at' => $registration->announced_at?->format('d M Y H:i'),
            'created_at' => $registration->created_at?->format('d M Y H:i'),
        ];
    }

    private function authorizeIndexPanelAccess(string $type): void
    {
        $user = auth()->user();

        if (! $user || $user->role === 'super_admin') {
            return;
        }

        if ($user->role === 'osis_admin' && $type !== 'osis') {
            abort(403, 'Kamu tidak memiliki akses ke data ini.');
        }

        if ($user->role === 'extracurricular_admin' && $type !== 'extracurricular') {
            abort(403, 'Kamu tidak memiliki akses ke data ini.');
        }

        if ($user->role === 'ppdb_admin') {
            abort(403, 'Admin PPDB tidak memiliki akses ke data kesiswaan.');
        }
    }

    private function authorizePanelAccess(StudentProgramRegistration $registration): void
    {
        $user = auth()->user();

        if (! $user || $user->role === 'super_admin') {
            return;
        }

        if ($user->role === 'osis_admin' && $registration->registration_type !== 'osis') {
            abort(403, 'Kamu tidak memiliki akses ke data ini.');
        }

        if (
            $user->role === 'extracurricular_admin' &&
            $registration->registration_type !== 'extracurricular'
        ) {
            abort(403, 'Kamu tidak memiliki akses ke data ini.');
        }

        if ($user->role === 'ppdb_admin') {
            abort(403, 'Admin PPDB tidak memiliki akses ke data kesiswaan.');
        }
    }

    private function currentPanel(Request $request): string
    {
        if ($request->is('admin/osis/*')) {
            return 'osis';
        }

        if ($request->is('admin/ekstrakurikuler/*')) {
            return 'extracurricular';
        }

        return 'default';
    }

    private function indexRedirectUrl(Request $request): string
    {
        if ($request->is('admin/osis/*')) {
            return route('admin.osis-panel.registrations.index');
        }

        if ($request->is('admin/ekstrakurikuler/*')) {
            return route('admin.extracurricular-panel.registrations.index');
        }

        return route('admin.student-registrations.index');
    }

    private function showRedirectUrl(Request $request, StudentProgramRegistration $registration): string
    {
        if ($request->is('admin/osis/*')) {
            return route('admin.osis-panel.registrations.show', $registration);
        }

        if ($request->is('admin/ekstrakurikuler/*')) {
            return route('admin.extracurricular-panel.registrations.show', $registration);
        }

        return route('admin.student-registrations.show', $registration);
    }
}