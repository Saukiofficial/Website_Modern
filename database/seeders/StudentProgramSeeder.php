<?php

namespace Database\Seeders;

use App\Models\StudentProgram;
use Illuminate\Database\Seeder;

class StudentProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'title' => 'OSIS & Kepemimpinan',
                'slug' => 'osis',
                'category' => 'Organisasi Siswa',
                'eyebrow' => 'Form Pendaftaran OSIS',
                'hero_title' => 'Pendaftaran Pengurus OSIS dan Program Kepemimpinan',
                'description' => 'Daftarkan diri untuk mengikuti seleksi pengurus OSIS dan program pembinaan kepemimpinan siswa.',
                'hero_image' => '/frontend/images/osis-detail-hero.jpg',
                'icon' => '👥',
                'form_title' => 'Form Pendaftaran OSIS',
                'form_description' => 'Isi data diri, pengalaman organisasi, dan alasan mengikuti OSIS.',
                'interest_label' => 'Bidang yang Diminati',
                'interest_options' => [
                    'Ketua / Wakil Ketua',
                    'Sekretaris',
                    'Bendahara',
                    'Seksi Kegiatan',
                    'Seksi Keagamaan',
                    'Seksi Kreativitas',
                    'Seksi Humas',
                ],
                'reason_label' => 'Alasan Mengikuti OSIS',
                'reason_placeholder' => 'Tuliskan alasan kamu ingin menjadi bagian dari OSIS',
                'points' => [
                    'Pelatihan dasar kepemimpinan siswa',
                    'Manajemen organisasi dan kerja sama tim',
                    'Program kerja OSIS dan kegiatan sekolah',
                    'Pembinaan karakter, disiplin, dan tanggung jawab',
                ],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Ekstrakurikuler',
                'slug' => 'ekstrakurikuler',
                'category' => 'Minat dan Bakat',
                'eyebrow' => 'Form Pendaftaran Ekstrakurikuler',
                'hero_title' => 'Pendaftaran Kegiatan Ekstrakurikuler Siswa',
                'description' => 'Pilih kegiatan ekstrakurikuler sesuai minat dan bakat untuk mengembangkan potensi diri.',
                'hero_image' => '/frontend/images/ekstrakurikuler-detail-hero.jpg',
                'icon' => '🎯',
                'form_title' => 'Form Pendaftaran Ekstrakurikuler',
                'form_description' => 'Isi data diri dan pilih ekstrakurikuler yang ingin diikuti.',
                'interest_label' => 'Ekstrakurikuler yang Dipilih',
                'interest_options' => [
                    'Pramuka',
                    'Paskibra',
                    'PMR',
                    'Basket',
                    'Futsal',
                    'Voli',
                    'Tari',
                    'Musik',
                    'English Club',
                    'Karya Ilmiah Remaja',
                    'Robotik',
                ],
                'reason_label' => 'Alasan Memilih Ekstrakurikuler',
                'reason_placeholder' => 'Tuliskan alasan kamu memilih ekstrakurikuler tersebut',
                'points' => [
                    'Pilihan kegiatan olahraga, seni, sains, dan teknologi',
                    'Pembinaan rutin bersama pembina ekstrakurikuler',
                    'Persiapan lomba dan kegiatan sekolah',
                    'Pengembangan bakat, kreativitas, dan percaya diri',
                ],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Bimbingan Konseling',
                'slug' => 'bimbingan-konseling',
                'category' => 'Layanan Siswa',
                'eyebrow' => 'Form Layanan BK',
                'hero_title' => 'Layanan Bimbingan Konseling Siswa',
                'description' => 'Ajukan layanan bimbingan konseling untuk kebutuhan akademik, pribadi, sosial, atau karier.',
                'hero_image' => '/frontend/images/bk-detail-hero.jpg',
                'icon' => '🤝',
                'form_title' => 'Form Pengajuan Layanan BK',
                'form_description' => 'Isi data diri dan pilih jenis layanan bimbingan yang dibutuhkan.',
                'interest_label' => 'Jenis Layanan',
                'interest_options' => [
                    'Konseling Pribadi',
                    'Konseling Akademik',
                    'Konseling Sosial',
                    'Bimbingan Karier',
                    'Konsultasi Orang Tua',
                ],
                'reason_label' => 'Keterangan / Permasalahan',
                'reason_placeholder' => 'Tuliskan keterangan singkat terkait layanan yang dibutuhkan',
                'points' => [
                    'Konseling pribadi dan sosial siswa',
                    'Pendampingan akademik dan motivasi belajar',
                    'Bimbingan karier dan rencana masa depan',
                    'Layanan konsultasi dengan guru BK',
                ],
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($programs as $program) {
            StudentProgram::query()->updateOrCreate(
                ['slug' => $program['slug']],
                $program
            );
        }
    }
}