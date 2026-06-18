<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Models\ExtracurricularMember;
use App\Models\StudentProgramRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularPanelRegistrationController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        $query = StudentProgramRegistration::query()
            ->where('registration_type', 'extracurricular')
            ->latest('submitted_at')
            ->latest('id');

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

        $summary = [
            'total' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->count(),
            'baru' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Baru')->count(),
            'diproses' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Diproses')->count(),
            'diterima' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Diterima')->count(),
            'ditolak' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Ditolak')->count(),
            'published' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('publish_to_frontend', true)->count(),
            'members' => ExtracurricularMember::query()->count(),
        ];

        return Inertia::render('Admin/ExtracurricularPanel/Registrations/Index', [
            'registrations' => $registrations,
            'filters' => [
                'type' => 'extracurricular',
                'status' => $status,
                'search' => $search,
            ],
            'summary' => $summary,
        ]);
    }

    public function show(StudentProgramRegistration $registration): Response
    {
        abort_unless($registration->registration_type === 'extracurricular', 404);

        return Inertia::render('Admin/ExtracurricularPanel/Registrations/Show', [
            'registration' => $this->registrationPayload($registration),
        ]);
    }

    public function update(Request $request, StudentProgramRegistration $registration): RedirectResponse
    {
        abort_unless($registration->registration_type === 'extracurricular', 404);

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

        if ($validated['status'] === 'Diterima') {
            $this->syncMemberFromAcceptedRegistration($registration->fresh());
        }

        return redirect()
            ->route('admin.extracurricular-panel.registrations.show', $registration)
            ->with('success', $validated['status'] === 'Diterima'
                ? 'Status pendaftaran berhasil diperbarui dan siswa otomatis masuk Anggota Ekskul.'
                : 'Status pendaftaran ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(StudentProgramRegistration $registration): RedirectResponse
    {
        abort_unless($registration->registration_type === 'extracurricular', 404);

        $registration->delete();

        return redirect()
            ->route('admin.extracurricular-panel.registrations.index')
            ->with('success', 'Data pendaftaran ekstrakurikuler berhasil dihapus.');
    }

    private function syncMemberFromAcceptedRegistration(StudentProgramRegistration $registration): void
    {
        $program = $this->findProgramForRegistration($registration);

        ExtracurricularMember::query()->updateOrCreate(
            [
                'registration_id' => $registration->id,
            ],
            [
                'extracurricular_id' => $program?->id,
                'student_name' => $registration->student_name,
                'nisn' => $registration->nisn,
                'class_name' => $registration->class_name,
                'gender' => $registration->gender,
                'phone' => $registration->phone,
                'email' => $registration->email,
                'program_title' => $program?->name ?: $registration->program_title,
                'role' => $registration->approved_role ?: 'Anggota',
                'joined_at' => now()->toDateString(),
                'note' => $registration->admin_note,
                'is_active' => true,
                'sort_order' => 0,
            ]
        );
    }

    private function findProgramForRegistration(StudentProgramRegistration $registration): ?Extracurricular
    {
        $extraData = is_array($registration->extra_data) ? $registration->extra_data : [];

        $possibleId = $extraData['extracurricular_id']
            ?? $extraData['program_id']
            ?? $extraData['selected_program_id']
            ?? null;

        if ($possibleId) {
            $program = Extracurricular::query()->find($possibleId);

            if ($program) {
                return $program;
            }
        }

        if ($registration->program_title) {
            return Extracurricular::query()
                ->where('name', $registration->program_title)
                ->orWhere('slug', str($registration->program_title)->slug()->toString())
                ->first();
        }

        return null;
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
}
