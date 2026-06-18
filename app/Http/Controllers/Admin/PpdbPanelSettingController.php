<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PpdbPanelSettingController extends Controller
{
    public function edit(): Response
    {
        $setting = PpdbSetting::query()->firstOrCreate(
            ['id' => 1],
            [
                'academic_year' => '2026/2027',
                'eyebrow' => 'Penerimaan Peserta Didik Baru',
                'hero_title' => 'PPDB SMA Negeri 1 Sumenep',
                'hero_description' => 'Bergabung bersama sekolah berprestasi, berkarakter, dan berbudaya. Daftarkan diri untuk menjadi bagian dari generasi unggul.',
                'hero_image' => '/frontend/images/ppdb-hero.jpg',

                'form_logo' => null,
                'form_title' => 'FORMULIR PENDAFTARAN PESERTA DIDIK BARU',
                'form_school_name' => 'SMA NEGERI 1 Sumenep',
                'form_address' => 'Jl. Contoh Alamat Sekolah',
                'form_website' => 'sekolah.sch.id',
                'form_email' => 'admin@sekolah.sch.id',

                'committee_signature' => null,
                'committee_name' => 'Panitia PPDB',
                'committee_position' => 'Ketua Panitia PPDB',
                'report_location' => 'Sumenep',

                'section_title' => 'Tahapan Pendaftaran',
                'section_description' => 'Ikuti alur pendaftaran peserta didik baru secara online dengan mudah, cepat, dan aman.',
                'requirement_title' => 'Berkas yang Disiapkan',
                'requirement_description' => 'Siapkan dokumen persyaratan sebelum melakukan pendaftaran online.',
                'cta_label' => 'Daftar Sekarang',
                'cta_url' => '/ppdb/daftar',
                'is_open' => true,
                'closed_message' => 'Pendaftaran PPDB saat ini belum dibuka.',
            ]
        );

        return Inertia::render('Admin/PpdbPanel/Settings/Edit', [
            'setting' => [
                'id' => $setting->id,

                'academic_year' => $setting->academic_year,
                'eyebrow' => $setting->eyebrow,
                'hero_title' => $setting->hero_title,
                'hero_description' => $setting->hero_description,
                'hero_image' => $setting->hero_image,
                'hero_image_url' => $setting->hero_image_url,

                'form_logo' => $setting->form_logo,
                'form_logo_url' => $setting->form_logo_url,
                'form_title' => $setting->form_title,
                'form_school_name' => $setting->form_school_name,
                'form_address' => $setting->form_address,
                'form_website' => $setting->form_website,
                'form_email' => $setting->form_email,

                'committee_signature' => $setting->committee_signature,
                'committee_signature_url' => $setting->committee_signature_url,
                'committee_name' => $setting->committee_name,
                'committee_position' => $setting->committee_position,
                'report_location' => $setting->report_location,

                'section_title' => $setting->section_title,
                'section_description' => $setting->section_description,
                'requirement_title' => $setting->requirement_title,
                'requirement_description' => $setting->requirement_description,

                'cta_label' => $setting->cta_label,
                'cta_url' => $setting->cta_url,

                'is_open' => $setting->is_open,
                'closed_message' => $setting->closed_message,
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $setting = PpdbSetting::query()->firstOrCreate(
            ['id' => 1],
            [
                'academic_year' => '2026/2027',
                'eyebrow' => 'Penerimaan Peserta Didik Baru',
                'hero_title' => 'PPDB SMA Negeri 1 Sumenep',
                'hero_description' => 'Bergabung bersama sekolah berprestasi, berkarakter, dan berbudaya. Daftarkan diri untuk menjadi bagian dari generasi unggul.',
                'hero_image' => '/frontend/images/ppdb-hero.jpg',

                'form_logo' => null,
                'form_title' => 'FORMULIR PENDAFTARAN PESERTA DIDIK BARU',
                'form_school_name' => 'SMA NEGERI 1 Sumenep',
                'form_address' => 'Jl. Contoh Alamat Sekolah',
                'form_website' => 'sekolah.sch.id',
                'form_email' => 'admin@sekolah.sch.id',

                'committee_signature' => null,
                'committee_name' => 'Panitia PPDB',
                'committee_position' => 'Ketua Panitia PPDB',
                'report_location' => 'Sumenep',

                'section_title' => 'Tahapan Pendaftaran',
                'section_description' => 'Ikuti alur pendaftaran peserta didik baru secara online dengan mudah, cepat, dan aman.',
                'requirement_title' => 'Berkas yang Disiapkan',
                'requirement_description' => 'Siapkan dokumen persyaratan sebelum melakukan pendaftaran online.',
                'cta_label' => 'Daftar Sekarang',
                'cta_url' => '/ppdb/daftar',
                'is_open' => true,
                'closed_message' => 'Pendaftaran PPDB saat ini belum dibuka.',
            ]
        );

        $validated = $request->validate([
            'academic_year' => ['nullable', 'string', 'max:255'],
            'eyebrow' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'form_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'form_title' => ['nullable', 'string', 'max:255'],
            'form_school_name' => ['nullable', 'string', 'max:255'],
            'form_address' => ['nullable', 'string', 'max:255'],
            'form_website' => ['nullable', 'string', 'max:255'],
            'form_email' => ['nullable', 'string', 'max:255'],

            'committee_signature' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'committee_name' => ['nullable', 'string', 'max:255'],
            'committee_position' => ['nullable', 'string', 'max:255'],
            'report_location' => ['nullable', 'string', 'max:255'],

            'section_title' => ['nullable', 'string', 'max:255'],
            'section_description' => ['nullable', 'string'],
            'requirement_title' => ['nullable', 'string', 'max:255'],
            'requirement_description' => ['nullable', 'string'],

            'cta_label' => ['nullable', 'string', 'max:255'],
            'cta_url' => ['nullable', 'string', 'max:255'],

            'is_open' => ['nullable'],
            'closed_message' => ['nullable', 'string'],
        ], [
            'hero_image.image' => 'File hero harus berupa gambar.',
            'hero_image.mimes' => 'Format gambar hero harus jpg, jpeg, png, atau webp.',
            'hero_image.max' => 'Ukuran gambar hero maksimal 4MB.',

            'form_logo.image' => 'Logo formulir harus berupa gambar.',
            'form_logo.mimes' => 'Format logo formulir harus jpg, jpeg, png, atau webp.',
            'form_logo.max' => 'Ukuran logo formulir maksimal 2MB.',

            'committee_signature.image' => 'Tanda tangan panitia harus berupa gambar.',
            'committee_signature.mimes' => 'Format tanda tangan panitia harus jpg, jpeg, png, atau webp.',
            'committee_signature.max' => 'Ukuran tanda tangan panitia maksimal 2MB.',
        ]);

        $payload = [
            'academic_year' => $validated['academic_year'] ?? null,
            'eyebrow' => $validated['eyebrow'] ?? null,
            'hero_title' => $validated['hero_title'] ?? null,
            'hero_description' => $validated['hero_description'] ?? null,

            'form_title' => $validated['form_title'] ?? null,
            'form_school_name' => $validated['form_school_name'] ?? null,
            'form_address' => $validated['form_address'] ?? null,
            'form_website' => $validated['form_website'] ?? null,
            'form_email' => $validated['form_email'] ?? null,

            'committee_name' => $validated['committee_name'] ?? null,
            'committee_position' => $validated['committee_position'] ?? null,
            'report_location' => $validated['report_location'] ?? null,

            'section_title' => $validated['section_title'] ?? null,
            'section_description' => $validated['section_description'] ?? null,
            'requirement_title' => $validated['requirement_title'] ?? null,
            'requirement_description' => $validated['requirement_description'] ?? null,

            'cta_label' => $validated['cta_label'] ?? null,
            'cta_url' => $validated['cta_url'] ?? null,

            'is_open' => filter_var($validated['is_open'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'closed_message' => $validated['closed_message'] ?? null,
        ];

        if ($request->hasFile('hero_image')) {
            $this->deletePublicFile($setting->hero_image);

            $payload['hero_image'] = $request
                ->file('hero_image')
                ->store('ppdb', 'public');
        }

        if ($request->hasFile('form_logo')) {
            $this->deletePublicFile($setting->form_logo);

            $payload['form_logo'] = $request
                ->file('form_logo')
                ->store('ppdb', 'public');
        }

        if ($request->hasFile('committee_signature')) {
            $this->deletePublicFile($setting->committee_signature);

            $payload['committee_signature'] = $request
                ->file('committee_signature')
                ->store('ppdb', 'public');
        }

        $setting->update($payload);

        return redirect()
            ->route('admin.ppdb-panel.settings.edit')
            ->with('success', 'Setting PPDB berhasil diperbarui.');
    }

    private function deletePublicFile(?string $file): void
    {
        if (! $file) {
            return;
        }

        if (str_starts_with($file, 'http')) {
            return;
        }

        if (str_starts_with($file, '/')) {
            return;
        }

        if (Storage::disk('public')->exists($file)) {
            Storage::disk('public')->delete($file);
        }
    }
}