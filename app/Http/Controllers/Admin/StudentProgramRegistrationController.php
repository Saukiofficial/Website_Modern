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
                    ->where('student_name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('program_title', 'like', "%{$search}%");
            });
        }

        $registrations = $query
            ->paginate(15)
            ->withQueryString()
            ->through(function (StudentProgramRegistration $registration) {
                return [
                    'id' => $registration->id,
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
                    'extra_data' => $registration->extra_data,
                    'status' => $registration->status,
                    'status_color' => $registration->status_color,
                    'admin_note' => $registration->admin_note,
                    'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
                    'created_at' => $registration->created_at?->format('d M Y H:i'),
                ];
            });

        $summary = [
            'total' => StudentProgramRegistration::query()->count(),
            'baru' => StudentProgramRegistration::query()->where('status', 'Baru')->count(),
            'diproses' => StudentProgramRegistration::query()->where('status', 'Diproses')->count(),
            'selesai' => StudentProgramRegistration::query()->where('status', 'Selesai')->count(),
            'osis' => StudentProgramRegistration::query()->where('registration_type', 'osis')->count(),
            'extracurricular' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->count(),
            'counseling' => StudentProgramRegistration::query()->where('registration_type', 'counseling')->count(),
        ];

        return Inertia::render('Admin/StudentRegistrations/Index', [
            'registrations' => $registrations,
            'filters' => [
                'type' => $type,
                'status' => $status,
                'search' => $search,
            ],
            'summary' => $summary,
        ]);
    }

    public function show(StudentProgramRegistration $registration): Response
    {
        return Inertia::render('Admin/StudentRegistrations/Show', [
            'registration' => [
                'id' => $registration->id,
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
                'admin_note' => $registration->admin_note,
                'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
                'created_at' => $registration->created_at?->format('d M Y H:i'),
            ],
        ]);
    }

    public function update(Request $request, StudentProgramRegistration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['Baru', 'Diproses', 'Selesai'])],
            'admin_note' => ['nullable', 'string'],
        ]);

        $registration->update([
            'status' => $validated['status'],
            'admin_note' => $validated['admin_note'] ?? null,
        ]);

        return redirect()
            ->route('admin.student-registrations.show', $registration)
            ->with('success', 'Status pendaftaran berhasil diperbarui.');
    }

    public function destroy(StudentProgramRegistration $registration): RedirectResponse
    {
        $registration->delete();

        return redirect()
            ->route('admin.student-registrations.index')
            ->with('success', 'Data pendaftaran berhasil dihapus.');
    }
}