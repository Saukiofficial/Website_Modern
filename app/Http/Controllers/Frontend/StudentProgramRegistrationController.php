<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use App\Models\StudentProgramRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentProgramRegistrationController extends Controller
{
    public function store(Request $request, string $type): RedirectResponse
    {
        $typeMap = [
            'osis' => [
                'registration_type' => 'osis',
                'program_title' => 'OSIS & Kepemimpinan',
                'interest_label' => 'bidang_yang_diminati',
            ],
            'ekstrakurikuler' => [
                'registration_type' => 'extracurricular',
                'program_title' => 'Ekstrakurikuler',
                'interest_label' => 'ekstrakurikuler_yang_dipilih',
            ],
            'bimbingan-konseling' => [
                'registration_type' => 'counseling',
                'program_title' => 'Bimbingan Konseling',
                'interest_label' => 'jenis_layanan',
            ],
        ];

        abort_unless(isset($typeMap[$type]), 404);

        $program = StudentProgram::query()
            ->where('slug', $type)
            ->where('is_active', true)
            ->first();

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'kelas' => ['required', 'string', 'max:255'],
            'noHp' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'interest' => ['required', 'string', 'max:255'],
            'pengalaman' => ['nullable', 'string'],
            'alasan' => ['required', 'string'],
            'agreement' => ['accepted'],
            'type' => [
                'required',
                'string',
                Rule::in(['osis', 'ekstrakurikuler', 'bimbingan-konseling']),
            ],
        ], [
            'nama.required' => 'Nama lengkap wajib diisi.',
            'kelas.required' => 'Kelas wajib dipilih.',
            'noHp.required' => 'Nomor HP / WhatsApp wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'interest.required' => 'Pilihan program wajib dipilih.',
            'alasan.required' => 'Alasan / keterangan wajib diisi.',
            'agreement.accepted' => 'Kamu harus menyetujui pernyataan data.',
        ]);

        $programConfig = $typeMap[$type];

        StudentProgramRegistration::query()->create([
            'registration_type' => $programConfig['registration_type'],
            'program_title' => $program?->title ?: $programConfig['program_title'],

            'student_name' => $validated['nama'],
            'nisn' => $validated['nisn'] ?? null,
            'class_name' => $validated['kelas'],
            'gender' => null,

            'phone' => $validated['noHp'],
            'email' => $validated['email'] ?? null,

            'experience' => $validated['pengalaman'] ?? null,
            'reason' => $validated['alasan'],

            'extra_data' => [
                $programConfig['interest_label'] => $validated['interest'],
            ],

            'status' => 'Baru',
            'admin_note' => null,
            'submitted_at' => now(),
        ]);

        return back()->with('success', 'Formulir berhasil dikirim ke admin.');
    }
}