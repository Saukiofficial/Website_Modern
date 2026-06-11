<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027',
                'category' => 'PPDB',
                'excerpt' => 'Informasi lengkap mengenai jadwal, persyaratan, dan alur pendaftaran peserta didik baru.',
                'content' => 'Sekolah membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Calon peserta didik dapat mengikuti proses pendaftaran sesuai jadwal yang telah ditentukan. Informasi lebih lanjut dapat dilihat melalui halaman PPDB atau menghubungi panitia sekolah.',
                'thumbnail' => '/frontend/images/news-1.jpg',
                'author' => 'Admin Sekolah',
                'published_at' => now()->toDateString(),
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Kegiatan Pembinaan Karakter dan Kepemimpinan Siswa',
                'category' => 'Kesiswaan',
                'excerpt' => 'Program pembinaan karakter siswa melalui kegiatan kepemimpinan, disiplin, dan kerja sama tim.',
                'content' => 'Kegiatan pembinaan karakter dan kepemimpinan siswa dilaksanakan sebagai bagian dari program kesiswaan. Melalui kegiatan ini, siswa diharapkan mampu mengembangkan sikap tanggung jawab, disiplin, percaya diri, dan kemampuan bekerja sama.',
                'thumbnail' => '/frontend/images/news-2.jpg',
                'author' => 'Admin Sekolah',
                'published_at' => now()->subDays(2)->toDateString(),
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Prestasi Siswa dalam Kompetisi Akademik Tingkat Kabupaten',
                'category' => 'Prestasi',
                'excerpt' => 'Siswa sekolah berhasil meraih prestasi membanggakan dalam kompetisi akademik tingkat kabupaten.',
                'content' => 'Prestasi membanggakan kembali diraih oleh siswa sekolah dalam kompetisi akademik tingkat kabupaten. Keberhasilan ini menjadi bukti komitmen sekolah dalam mendukung potensi dan prestasi peserta didik.',
                'thumbnail' => '/frontend/images/news-3.jpg',
                'author' => 'Admin Sekolah',
                'published_at' => now()->subDays(5)->toDateString(),
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($posts as $post) {
            Post::query()->updateOrCreate(
                ['slug' => Str::slug($post['title'])],
                [
                    ...$post,
                    'slug' => Str::slug($post['title']),
                ]
            );
        }
    }
}