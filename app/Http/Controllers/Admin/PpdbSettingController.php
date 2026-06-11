<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PpdbSettingController extends Controller
{
    public function edit(): Response
    {
        $setting = PpdbSetting::query()->firstOrCreate(
            ['id' => 1],
            [
                'academic_year' => '2026/2027',
                'eyebrow' => 'Penerimaan Peserta Didik Baru',
                'hero_title' => 'PPDB SMA Negeri 1 Mojokerto',
                'hero_description' => 'Bergabung bersama sekolah berprestasi, berkarakter, dan berbudaya. Daftarkan diri untuk menjadi bagian dari generasi unggul.',
                'hero_image' => '/frontend/images/ppdb-hero.jpg',
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

        return Inertia::render('Admin/PpdbSettings/Edit', [
            'setting' => [
                'id' => $setting->id,
                'academic_year' => $setting->academic_year,
                'eyebrow' => $setting->eyebrow,
                'hero_title' => $setting->hero_title,
                'hero_description' => $setting->hero_description,
                'hero_image' => $setting->hero_image,
                'hero_image_url' => $setting->hero_image_url,
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
        $setting = PpdbSetting::query()->firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'academic_year' => ['nullable', 'string', 'max:255'],
            'eyebrow' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'section_title' => ['nullable', 'string', 'max:255'],
            'section_description' => ['nullable', 'string'],
            'requirement_title' => ['nullable', 'string', 'max:255'],
            'requirement_description' => ['nullable', 'string'],
            'cta_label' => ['nullable', 'string', 'max:255'],
            'cta_url' => ['nullable', 'string', 'max:255'],
            'is_open' => ['nullable'],
            'closed_message' => ['nullable', 'string'],
        ]);

        $payload = [
            'academic_year' => $validated['academic_year'] ?? null,
            'eyebrow' => $validated['eyebrow'] ?? null,
            'hero_title' => $validated['hero_title'] ?? null,
            'hero_description' => $validated['hero_description'] ?? null,
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
            if (
                $setting->hero_image &&
                ! str_starts_with($setting->hero_image, '/') &&
                Storage::disk('public')->exists($setting->hero_image)
            ) {
                Storage::disk('public')->delete($setting->hero_image);
            }

            $payload['hero_image'] = $request
                ->file('hero_image')
                ->store('ppdb', 'public');
        }

        $setting->update($payload);

        return redirect()
            ->route('admin.ppdb-periods.edit')
            ->with('success', 'Setting PPDB berhasil diperbarui.');
    }
}