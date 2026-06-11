<?php

namespace Database\Seeders;

use App\Models\PpdbRequirement;
use App\Models\PpdbSetting;
use App\Models\PpdbStep;
use App\Models\PpdbTimeline;
use Illuminate\Database\Seeder;

class PpdbSeeder extends Seeder
{
    public function run(): void
    {
        PpdbSetting::query()->updateOrCreate(
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

        $timelines = [
            [
                'title' => 'Pendaftaran',
                'date_text' => '01 Juni - 30 Juni 2026',
                'icon' => '🗓️',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Verifikasi Berkas',
                'date_text' => '01 Juli - 05 Juli 2026',
                'icon' => '📋',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Pengumuman',
                'date_text' => '10 Juli 2026',
                'icon' => '📢',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($timelines as $timeline) {
            PpdbTimeline::query()->updateOrCreate(
                ['title' => $timeline['title']],
                $timeline
            );
        }

        $steps = [
            [
                'number' => '01',
                'step_label' => 'Tahap 1',
                'title' => 'Isi Formulir',
                'description' => 'Calon siswa mengisi data pendaftaran secara lengkap.',
                'icon' => '📝',
                'accent_class' => 'border-b-[#d5a542]',
                'icon_bg_class' => 'bg-[#f7eef3]',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'number' => '02',
                'step_label' => 'Tahap 2',
                'title' => 'Unggah Berkas',
                'description' => 'Siapkan dokumen persyaratan sesuai ketentuan sekolah.',
                'icon' => '📁',
                'accent_class' => 'border-b-[#d5a542]',
                'icon_bg_class' => 'bg-[#faf5e8]',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'number' => '03',
                'step_label' => 'Tahap 3',
                'title' => 'Verifikasi',
                'description' => 'Panitia melakukan pengecekan data dan kelengkapan berkas.',
                'icon' => '✅',
                'accent_class' => 'border-b-[#61c48f]',
                'icon_bg_class' => 'bg-[#eef9f2]',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'number' => '04',
                'step_label' => 'Tahap 4',
                'title' => 'Pengumuman',
                'description' => 'Hasil seleksi akan diumumkan melalui website sekolah.',
                'icon' => '📣',
                'accent_class' => 'border-b-[#ef7aa8]',
                'icon_bg_class' => 'bg-[#fdf0f5]',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($steps as $step) {
            PpdbStep::query()->updateOrCreate(
                ['title' => $step['title']],
                $step
            );
        }

        $requirements = [
            [
                'title' => 'Fotokopi Kartu Keluarga',
                'description' => 'Dokumen Kartu Keluarga dalam format PDF/JPG/PNG.',
                'is_required' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Fotokopi Akta Kelahiran',
                'description' => 'Dokumen Akta Kelahiran dalam format PDF/JPG/PNG.',
                'is_required' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Fotokopi Ijazah atau Surat Keterangan Lulus',
                'description' => 'Ijazah/SKL dari sekolah sebelumnya.',
                'is_required' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Pas Foto 3x4',
                'description' => 'Pas foto terbaru format JPG/PNG.',
                'is_required' => true,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Rapor semester terakhir',
                'description' => 'Scan rapor semester terakhir.',
                'is_required' => true,
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($requirements as $requirement) {
            PpdbRequirement::query()->updateOrCreate(
                ['title' => $requirement['title']],
                $requirement
            );
        }
    }
}