<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Models\ExtracurricularMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularPanelMemberController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $programId = $request->query('program_id', 'all');
        $status = $request->query('status', 'all');

        $query = ExtracurricularMember::query()
            ->with('extracurricular')
            ->orderBy('sort_order')
            ->latest('joined_at')
            ->latest('id');

        if ($programId !== 'all') {
            $query->where('extracurricular_id', $programId);
        }

        if ($status !== 'all') {
            $query->where('is_active', $status === 'active');
        }

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('student_name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('program_title', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query
            ->paginate(15)
            ->withQueryString()
            ->through(fn (ExtracurricularMember $member) => $this->memberPayload($member));

        $programs = Extracurricular::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (Extracurricular $program) => [
                'id' => $program->id,
                'name' => $program->name,
            ]);

        $summary = [
            'total' => ExtracurricularMember::query()->count(),
            'active' => ExtracurricularMember::query()->where('is_active', true)->count(),
            'inactive' => ExtracurricularMember::query()->where('is_active', false)->count(),
            'programs' => Extracurricular::query()->count(),
        ];

        return Inertia::render('Admin/ExtracurricularPanel/Members/Index', [
            'members' => $members,
            'programs' => $programs,
            'filters' => [
                'search' => $search,
                'program_id' => $programId,
                'status' => $status,
            ],
            'summary' => $summary,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ExtracurricularPanel/Members/Create', [
            'programs' => $this->programOptions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'extracurricular_id' => ['nullable', 'exists:extracurriculars,id'],
            'student_name' => ['required', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'program_title' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'joined_at' => ['nullable', 'date'],
            'note' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $programTitle = $validated['program_title'] ?? null;

        if (!$programTitle && !empty($validated['extracurricular_id'])) {
            $programTitle = Extracurricular::query()->find($validated['extracurricular_id'])?->name;
        }

        ExtracurricularMember::query()->create([
            'extracurricular_id' => $validated['extracurricular_id'] ?? null,
            'student_name' => $validated['student_name'],
            'nisn' => $validated['nisn'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'program_title' => $programTitle,
            'role' => $validated['role'] ?? 'Anggota',
            'joined_at' => $validated['joined_at'] ?? now()->toDateString(),
            'note' => $validated['note'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()
            ->route('admin.extracurricular-panel.members.index')
            ->with('success', 'Anggota ekstrakurikuler berhasil ditambahkan.');
    }

    public function edit(ExtracurricularMember $member): Response
    {
        return Inertia::render('Admin/ExtracurricularPanel/Members/Edit', [
            'member' => $this->memberPayload($member->load('extracurricular')),
            'programs' => $this->programOptions(),
        ]);
    }

    public function update(Request $request, ExtracurricularMember $member): RedirectResponse
    {
        $validated = $request->validate([
            'extracurricular_id' => ['nullable', 'exists:extracurriculars,id'],
            'student_name' => ['required', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'program_title' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'joined_at' => ['nullable', 'date'],
            'note' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $programTitle = $validated['program_title'] ?? null;

        if (!$programTitle && !empty($validated['extracurricular_id'])) {
            $programTitle = Extracurricular::query()->find($validated['extracurricular_id'])?->name;
        }

        $member->update([
            'extracurricular_id' => $validated['extracurricular_id'] ?? null,
            'student_name' => $validated['student_name'],
            'nisn' => $validated['nisn'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'program_title' => $programTitle,
            'role' => $validated['role'] ?? 'Anggota',
            'joined_at' => $validated['joined_at'] ?? null,
            'note' => $validated['note'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()
            ->route('admin.extracurricular-panel.members.index')
            ->with('success', 'Anggota ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(ExtracurricularMember $member): RedirectResponse
    {
        $member->delete();

        return redirect()
            ->route('admin.extracurricular-panel.members.index')
            ->with('success', 'Anggota ekstrakurikuler berhasil dihapus.');
    }

    private function memberPayload(ExtracurricularMember $member): array
    {
        return [
            'id' => $member->id,
            'extracurricular_id' => $member->extracurricular_id,
            'extracurricular_name' => $member->extracurricular?->name,
            'registration_id' => $member->registration_id,
            'student_name' => $member->student_name,
            'nisn' => $member->nisn,
            'class_name' => $member->class_name,
            'gender' => $member->gender,
            'phone' => $member->phone,
            'email' => $member->email,
            'program_title' => $member->program_title,
            'role' => $member->role,
            'joined_at' => $member->joined_at?->format('Y-m-d'),
            'joined_at_label' => $member->joined_at?->format('d M Y'),
            'note' => $member->note,
            'is_active' => $member->is_active,
            'sort_order' => $member->sort_order,
        ];
    }

    private function programOptions()
    {
        return Extracurricular::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (Extracurricular $program) => [
                'id' => $program->id,
                'name' => $program->name,
            ]);
    }
}
