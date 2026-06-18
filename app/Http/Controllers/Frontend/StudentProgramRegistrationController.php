<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use App\Models\StudentProgramRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StudentProgramRegistrationController extends Controller
{
    public function store(Request $request, string $type): RedirectResponse
    {
        $normalizedType = $this->normalizeType($type);

        abort_unless(in_array($normalizedType, ['osis', 'extracurricular', 'counseling'], true), 404);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'kelas' => ['required', 'string', 'max:255'],
            'jenisKelamin' => ['nullable', 'string', 'max:255'],
            'noHp' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'interest' => ['required', 'string', 'max:255'],
            'pengalaman' => ['nullable', 'string'],
            'alasan' => ['required', 'string'],
            'agreement' => ['accepted'],
        ], [
            'nama.required' => 'Nama lengkap wajib diisi.',
            'kelas.required' => 'Kelas wajib dipilih.',
            'noHp.required' => 'Nomor HP / WhatsApp wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'interest.required' => 'Pilihan program wajib dipilih.',
            'alasan.required' => 'Alasan mengikuti program wajib diisi.',
            'agreement.accepted' => 'Kamu harus menyetujui pernyataan data.',
        ]);

        $program = StudentProgram::query()
            ->where(function ($query) use ($type, $normalizedType) {
                $query
                    ->where('slug', $type)
                    ->orWhere('slug', $normalizedType);
            })
            ->first();

        $registrationNumber = $this->generateRegistrationNumber($normalizedType);

        StudentProgramRegistration::query()->create([
            'registration_number' => $registrationNumber,
            'registration_type' => $normalizedType,
            'program_title' => $validated['interest'],
            'student_name' => $validated['nama'],
            'nisn' => $validated['nisn'] ?? null,
            'class_name' => $validated['kelas'],
            'gender' => $validated['jenisKelamin'] ?? null,
            'phone' => $validated['noHp'],
            'email' => $validated['email'] ?? null,
            'experience' => $validated['pengalaman'] ?? null,
            'reason' => $validated['alasan'],
            'extra_data' => [
                'program_id' => $program?->id,
                'program_slug' => $program?->slug,
                'program_page_title' => $program?->title,
                'interest' => $validated['interest'],
            ],
            'status' => 'Baru',
            'admin_note' => null,
            'approved_role' => null,
            'publish_to_frontend' => false,
            'announced_at' => null,
            'submitted_at' => now(),
        ]);

        return back()->with(
            'success',
            "Pendaftaran berhasil dikirim. Nomor pendaftaran: {$registrationNumber}"
        );
    }

    public function announcement(): Response
    {
        return Inertia::render('Frontend/KesiswaanAnnouncement', [
            'result' => null,
            'searched' => false,
            'keyword' => '',
        ]);
    }

    public function checkAnnouncement(Request $request): Response
    {
        $validated = $request->validate([
            'keyword' => ['required', 'string', 'max:255'],
        ], [
            'keyword.required' => 'Nomor pendaftaran, NISN, atau nomor HP wajib diisi.',
        ]);

        $keyword = trim($validated['keyword']);

        $registration = StudentProgramRegistration::query()
            ->where(function ($query) use ($keyword) {
                $query
                    ->where('registration_number', $keyword)
                    ->orWhere('nisn', $keyword)
                    ->orWhere('phone', $keyword);
            })
            ->latest('submitted_at')
            ->latest('id')
            ->first();

        return Inertia::render('Frontend/KesiswaanAnnouncement', [
            'result' => $registration ? $this->announcementPayload($registration) : null,
            'searched' => true,
            'keyword' => $keyword,
        ]);
    }

    public function printAnnouncement(StudentProgramRegistration $registration)
    {
        $status = $registration->status ?: 'Baru';

        $statusLabel = match ($status) {
            'Diterima' => 'DITERIMA',
            'Ditolak' => 'TIDAK DITERIMA',
            'Diproses' => 'SEDANG DIVERIFIKASI',
            default => 'BELUM DIUMUMKAN',
        };

        $message = match ($status) {
            'Diterima' => 'Berdasarkan hasil verifikasi pendaftaran kesiswaan, siswa tersebut dinyatakan DITERIMA.',
            'Ditolak' => 'Berdasarkan hasil verifikasi pendaftaran kesiswaan, siswa tersebut dinyatakan TIDAK DITERIMA.',
            'Diproses' => 'Data pendaftaran masih dalam proses verifikasi oleh pihak sekolah.',
            default => 'Hasil pendaftaran belum diumumkan. Silakan cek kembali sesuai informasi resmi sekolah.',
        };

        return view('frontend.kesiswaan-announcement-print', [
            'registration' => $registration,
            'status' => $status,
            'statusLabel' => $statusLabel,
            'message' => $message,
        ]);
    }

    private function announcementPayload(StudentProgramRegistration $registration): array
    {
        $status = $registration->status ?: 'Baru';

        $statusLabel = match ($status) {
            'Diterima' => 'Diterima',
            'Ditolak' => 'Tidak Diterima',
            'Diproses' => 'Sedang Diverifikasi',
            default => 'Belum Diumumkan',
        };

        $statusType = match ($status) {
            'Diterima' => 'accepted',
            'Ditolak' => 'rejected',
            'Diproses' => 'process',
            default => 'pending',
        };

        $message = match ($status) {
            'Diterima' => $registration->registration_type === 'osis'
                ? 'Selamat! Kamu dinyatakan diterima dalam proses pendaftaran OSIS.'
                : 'Selamat! Kamu dinyatakan diterima dalam proses pendaftaran ekstrakurikuler.',
            'Ditolak' => 'Mohon maaf, kamu belum dinyatakan diterima pada pendaftaran kesiswaan ini.',
            'Diproses' => 'Data kamu sedang diverifikasi oleh pihak sekolah.',
            default => 'Hasil pendaftaran belum diumumkan. Silakan cek kembali sesuai jadwal pengumuman.',
        };

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
            'approved_role' => $registration->approved_role,
            'status' => $status,
            'status_label' => $statusLabel,
            'status_type' => $statusType,
            'message' => $message,
            'admin_note' => $registration->admin_note,
            'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
            'announced_at' => $registration->announced_at?->format('d M Y H:i'),
        ];
    }

    private function normalizeType(string $type): string
    {
        return match ($type) {
            'ekstrakurikuler', 'extracurricular' => 'extracurricular',
            'bimbingan-konseling', 'counseling' => 'counseling',
            default => 'osis',
        };
    }

    private function generateRegistrationNumber(string $type): string
    {
        $prefix = match ($type) {
            'extracurricular' => 'EKS',
            'counseling' => 'BK',
            default => 'OSIS',
        };

        do {
            $number = $prefix . '-' . now()->format('Ymd') . '-' . strtoupper(Str::random(5));
        } while (
            StudentProgramRegistration::query()
                ->where('registration_number', $number)
                ->exists()
        );

        return $number;
    }
}
