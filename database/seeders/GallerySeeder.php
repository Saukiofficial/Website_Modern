<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleries = [
            [
                'title' => 'Kegiatan Upacara Bendera',
                'category' => 'Kegiatan Sekolah',
                'description' => 'Dokumentasi kegiatan upacara bendera yang dilaksanakan di halaman sekolah.',
                'image' => '/frontend/images/gallery-1.jpg',
                'event_date' => now()->subDays(3)->toDateString(),
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Pembelajaran di Kelas',
                'category' => 'Akademik',
                'description' => 'Suasana pembelajaran aktif dan interaktif antara guru dan siswa.',
                'image' => '/frontend/images/gallery-2.jpg',
                'event_date' => now()->subDays(7)->toDateString(),
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Kegiatan Ekstrakurikuler',
                'category' => 'Kesiswaan',
                'description' => 'Dokumentasi kegiatan ekstrakurikuler siswa dalam mengembangkan minat dan bakat.',
                'image' => '/frontend/images/gallery-3.jpg',
                'event_date' => now()->subDays(10)->toDateString(),
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Prestasi Siswa',
                'category' => 'Prestasi',
                'description' => 'Momen penghargaan atas prestasi siswa di bidang akademik dan non-akademik.',
                'image' => '/frontend/images/gallery-4.jpg',
                'event_date' => now()->subDays(14)->toDateString(),
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Kegiatan Literasi Sekolah',
                'category' => 'Literasi',
                'description' => 'Kegiatan literasi untuk meningkatkan budaya membaca dan menulis siswa.',
                'image' => '/frontend/images/gallery-5.jpg',
                'event_date' => now()->subDays(18)->toDateString(),
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Kegiatan Keagamaan',
                'category' => 'Karakter',
                'description' => 'Dokumentasi kegiatan pembinaan karakter dan keagamaan di sekolah.',
                'image' => '/frontend/images/gallery-6.jpg',
                'event_date' => now()->subDays(21)->toDateString(),
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($galleries as $gallery) {
            Gallery::query()->updateOrCreate(
                [
                    'title' => $gallery['title'],
                ],
                $gallery
            );
        }
    }
}