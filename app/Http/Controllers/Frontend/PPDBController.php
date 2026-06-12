<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\PpdbRegistration;
use App\Models\PpdbRequirement;
use App\Models\PpdbSetting;
use App\Models\PpdbStep;
use App\Models\PpdbTimeline;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PPDBController extends Controller
{
    public function index(): Response
    {
        $setting = PpdbSetting::query()->first();

        $timelines = PpdbTimeline::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (PpdbTimeline $timeline) => [
                'id' => $timeline->id,
                'title' => $timeline->title,
                'date' => $timeline->date_text,
                'icon' => $timeline->icon ?: '🗓️',
                'sort_order' => $timeline->sort_order,
            ]);

        $steps = PpdbStep::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (PpdbStep $step) => [
                'id' => $step->id,
                'number' => $step->number,
                'stepLabel' => $step->step_label,
                'title' => $step->title,
                'description' => $step->description,
                'icon' => $step->icon ?: '📝',
                'accent' => $step->accent_class ?: 'border-b-[#d5a542]',
                'iconBg' => $step->icon_bg_class ?: 'bg-[#faf5e8]',
                'sort_order' => $step->sort_order,
            ]);

        $requirements = PpdbRequirement::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (PpdbRequirement $requirement) => [
                'id' => $requirement->id,
                'title' => $requirement->title,
                'description' => $requirement->description,
                'is_required' => $requirement->is_required,
                'sort_order' => $requirement->sort_order,
            ]);

        return Inertia::render('Frontend/PPDB', [
            'setting' => $this->settingPayload($setting),
            'timelines' => $timelines,
            'steps' => $steps,
            'requirements' => $requirements,
        ]);
    }

    public function register(): Response
    {
        $setting = PpdbSetting::query()->first();

        return Inertia::render('Frontend/PPDBRegister', [
            'setting' => $setting ? [
                'academic_year' => $setting->academic_year,
                'is_open' => $setting->is_open,
                'closed_message' => $setting->closed_message,
            ] : null,
        ]);
    }

    public function announcement(): Response
    {
        $setting = PpdbSetting::query()->first();

        return Inertia::render('Frontend/PPDBAnnouncement', [
            'setting' => $this->settingPayload($setting),
            'result' => null,
            'searched' => false,
            'keyword' => '',
        ]);
    }

    public function checkAnnouncement(Request $request): Response
    {
        $setting = PpdbSetting::query()->first();

        $validated = $request->validate([
            'keyword' => ['required', 'string', 'max:255'],
        ], [
            'keyword.required' => 'Nomor pendaftaran atau NISN wajib diisi.',
        ]);

        $keyword = trim($validated['keyword']);

        $registration = PpdbRegistration::query()
            ->where(function ($query) use ($keyword) {
                $query
                    ->where('registration_number', $keyword)
                    ->orWhere('nisn', $keyword);
            })
            ->first();

        return Inertia::render('Frontend/PPDBAnnouncement', [
            'setting' => $this->settingPayload($setting),
            'result' => $registration ? $this->announcementPayload($registration) : null,
            'searched' => true,
            'keyword' => $keyword,
        ]);
    }

    public function printAnnouncement(PpdbRegistration $registration)
    {
        $setting = PpdbSetting::query()->first();

        $status = $registration->status ?: 'Baru';

        $statusLabel = match ($status) {
            'Diterima' => 'DITERIMA',
            'Ditolak' => 'TIDAK DITERIMA',
            'Diproses' => 'SEDANG DIVERIFIKASI',
            default => 'BELUM DIUMUMKAN',
        };

        $message = match ($status) {
            'Diterima' => 'Berdasarkan hasil verifikasi dan seleksi Penerimaan Peserta Didik Baru, calon peserta didik tersebut dinyatakan DITERIMA.',
            'Ditolak' => 'Berdasarkan hasil verifikasi dan seleksi Penerimaan Peserta Didik Baru, calon peserta didik tersebut dinyatakan TIDAK DITERIMA.',
            'Diproses' => 'Data calon peserta didik masih dalam proses verifikasi oleh panitia PPDB.',
            default => 'Hasil seleksi calon peserta didik belum diumumkan. Silakan menunggu jadwal pengumuman resmi.',
        };

        return view('frontend.ppdb-announcement-print', [
            'registration' => $registration,
            'setting' => $setting,
            'status' => $status,
            'statusLabel' => $statusLabel,
            'message' => $message,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $setting = PpdbSetting::query()->first();

        if ($setting && ! $setting->is_open) {
            return back()->with(
                'error',
                $setting->closed_message ?: 'Pendaftaran PPDB saat ini belum dibuka.'
            );
        }

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'jenisKelamin' => ['required', 'string', 'max:255'],
            'tempatLahir' => ['required', 'string', 'max:255'],
            'tanggalLahir' => ['required', 'date'],
            'agama' => ['required', 'string', 'max:255'],
            'asalSekolah' => ['required', 'string', 'max:255'],
            'alamat' => ['required', 'string'],

            'namaAyah' => ['nullable', 'string', 'max:255'],
            'pekerjaanAyah' => ['nullable', 'string', 'max:255'],
            'namaIbu' => ['nullable', 'string', 'max:255'],
            'pekerjaanIbu' => ['nullable', 'string', 'max:255'],

            'noHp' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],

            'familyCard' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            'birthCertificate' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            'certificate' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            'reportCard' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
            'photo' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],

            'agreement' => ['accepted'],
        ], [
            'nama.required' => 'Nama lengkap wajib diisi.',
            'jenisKelamin.required' => 'Jenis kelamin wajib dipilih.',
            'tempatLahir.required' => 'Tempat lahir wajib diisi.',
            'tanggalLahir.required' => 'Tanggal lahir wajib diisi.',
            'agama.required' => 'Agama wajib dipilih.',
            'asalSekolah.required' => 'Asal sekolah wajib diisi.',
            'alamat.required' => 'Alamat wajib diisi.',
            'noHp.required' => 'Nomor HP wajib diisi.',

            'email.email' => 'Format email tidak valid.',

            'familyCard.required' => 'Kartu Keluarga wajib diupload.',
            'birthCertificate.required' => 'Akta Kelahiran wajib diupload.',
            'certificate.required' => 'Ijazah / SKL wajib diupload.',
            'reportCard.required' => 'Rapor terakhir wajib diupload.',
            'photo.required' => 'Pas foto wajib diupload.',

            'familyCard.mimes' => 'Kartu Keluarga harus berformat PDF, JPG, JPEG, atau PNG.',
            'birthCertificate.mimes' => 'Akta Kelahiran harus berformat PDF, JPG, JPEG, atau PNG.',
            'certificate.mimes' => 'Ijazah / SKL harus berformat PDF, JPG, JPEG, atau PNG.',
            'reportCard.mimes' => 'Rapor harus berformat PDF, JPG, JPEG, atau PNG.',
            'photo.mimes' => 'Pas foto harus berformat JPG, JPEG, atau PNG.',

            'familyCard.max' => 'Ukuran Kartu Keluarga maksimal 2MB.',
            'birthCertificate.max' => 'Ukuran Akta Kelahiran maksimal 2MB.',
            'certificate.max' => 'Ukuran Ijazah / SKL maksimal 2MB.',
            'reportCard.max' => 'Ukuran Rapor maksimal 2MB.',
            'photo.max' => 'Ukuran Pas Foto maksimal 2MB.',

            'agreement.accepted' => 'Kamu harus menyetujui pernyataan data.',
        ]);

        $registrationNumber = $this->generateRegistrationNumber();

        PpdbRegistration::query()->create([
            'registration_number' => $registrationNumber,

            'student_name' => $validated['nama'],
            'nisn' => $validated['nisn'] ?? null,
            'gender' => $validated['jenisKelamin'],
            'birth_place' => $validated['tempatLahir'],
            'birth_date' => $validated['tanggalLahir'],
            'religion' => $validated['agama'],
            'previous_school' => $validated['asalSekolah'],
            'address' => $validated['alamat'],

            'father_name' => $validated['namaAyah'] ?? null,
            'father_job' => $validated['pekerjaanAyah'] ?? null,
            'mother_name' => $validated['namaIbu'] ?? null,
            'mother_job' => $validated['pekerjaanIbu'] ?? null,

            'phone' => $validated['noHp'],
            'email' => $validated['email'] ?? null,

            'family_card_file' => $request->file('familyCard')->store('ppdb-documents', 'public'),
            'birth_certificate_file' => $request->file('birthCertificate')->store('ppdb-documents', 'public'),
            'certificate_file' => $request->file('certificate')->store('ppdb-documents', 'public'),
            'report_card_file' => $request->file('reportCard')->store('ppdb-documents', 'public'),
            'photo_file' => $request->file('photo')->store('ppdb-documents', 'public'),

            'status' => 'Baru',
            'admin_note' => null,
            'submitted_at' => now(),
        ]);

        return back()->with(
            'success',
            "Pendaftaran berhasil dikirim. Nomor pendaftaran: {$registrationNumber}"
        );
    }

    private function settingPayload(?PpdbSetting $setting): ?array
    {
        if (! $setting) {
            return null;
        }

        return [
            'id' => $setting->id,
            'academic_year' => $setting->academic_year,
            'eyebrow' => $setting->eyebrow,
            'hero_title' => $setting->hero_title,
            'hero_description' => $setting->hero_description,
            'hero_image_url' => $setting->hero_image_url,
            'section_title' => $setting->section_title,
            'section_description' => $setting->section_description,
            'requirement_title' => $setting->requirement_title,
            'requirement_description' => $setting->requirement_description,
            'cta_label' => $setting->cta_label,
            'cta_url' => $setting->cta_url,
            'is_open' => $setting->is_open,
            'closed_message' => $setting->closed_message,
        ];
    }

    private function announcementPayload(PpdbRegistration $registration): array
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
            'Diterima' => 'Selamat! Anda dinyatakan diterima sebagai calon peserta didik baru.',
            'Ditolak' => 'Mohon maaf, Anda belum dinyatakan diterima pada periode PPDB ini.',
            'Diproses' => 'Data Anda sedang diverifikasi oleh panitia PPDB.',
            default => 'Hasil seleksi belum diumumkan. Silakan cek kembali sesuai jadwal pengumuman.',
        };

        return [
            'id' => $registration->id,
            'registration_number' => $registration->registration_number,
            'student_name' => $registration->student_name,
            'nisn' => $registration->nisn,
            'gender' => $registration->gender,
            'birth_place' => $registration->birth_place,
            'birth_date' => $registration->birth_date?->format('d M Y'),
            'religion' => $registration->religion,
            'previous_school' => $registration->previous_school,
            'address' => $registration->address,
            'phone' => $registration->phone,
            'email' => $registration->email,
            'photo_url' => $registration->photo_url,

            'status' => $status,
            'status_label' => $statusLabel,
            'status_type' => $statusType,
            'message' => $message,
            'admin_note' => $registration->admin_note,
            'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
        ];
    }

    private function generateRegistrationNumber(): string
    {
        do {
            $number = 'PPDB-' . now()->format('Ymd') . '-' . strtoupper(Str::random(5));
        } while (
            PpdbRegistration::query()
                ->where('registration_number', $number)
                ->exists()
        );

        return $number;
    }
}