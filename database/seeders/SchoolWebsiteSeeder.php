<?php

namespace Database\Seeders;

use App\Models\HomeSection;
use App\Models\Menu;
use App\Models\SchoolSetting;
use App\Models\SchoolStatistic;
use Illuminate\Database\Seeder;

class SchoolWebsiteSeeder extends Seeder
{
    public function run(): void
    {
        SchoolSetting::updateOrCreate(
            ['id' => 1],
            [
                'school_name' => 'SMA Negeri 1 Sumenep',
                'tagline' => 'Sekolah Berprestasi, Berkarakter, dan Berdaya Saing Global',
                'logo' => null,
                'phone' => '0321-123456',
                'email' => 'info@sman1Sumenep.sch.id',
                'address' => 'Jl. Pendidikan No. 1, Sumenep, Jawa Timur',
                'facebook_url' => '#',
                'instagram_url' => '#',
                'youtube_url' => '#',
            ]
        );

        $menus = [
            [
                'label' => 'Beranda',
                'url' => '/',
                'sort_order' => 1,
            ],
            [
                'label' => 'Profil',
                'url' => '/profil',
                'sort_order' => 2,
            ],
            [
                'label' => 'Akademik',
                'url' => '/akademik',
                'sort_order' => 3,
            ],
            [
                'label' => 'Kesiswaan',
                'url' => '/kesiswaan',
                'sort_order' => 4,
            ],
            [
                'label' => 'Informasi',
                'url' => '/informasi',
                'sort_order' => 5,
            ],
            [
                'label' => 'Galeri',
                'url' => '/galeri',
                'sort_order' => 6,
            ],
            [
                'label' => 'PPDB',
                'url' => '/ppdb',
                'sort_order' => 7,
            ],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['url' => $menu['url']],
                [
                    'label' => $menu['label'],
                    'parent_id' => null,
                    'sort_order' => $menu['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        HomeSection::updateOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Mewujudkan Generasi Cerdas, Berkarakter, dan Berdaya Saing Global',
                'hero_subtitle' => 'Kami berkomitmen memberikan pendidikan terbaik untuk masa depan yang gemilang.',
                'hero_button_text' => 'Selengkapnya',
                'hero_button_url' => '#profil',
                'hero_background' => null,
                'hero_image' => null,
                'ppdb_title' => 'Penerimaan Peserta Didik Baru',
                'ppdb_description' => 'Daftarkan diri sebagai calon peserta didik baru dan jadilah bagian dari sekolah berprestasi.',
                'ppdb_button_text' => 'Daftar Sekarang',
                'ppdb_button_url' => '/ppdb/daftar',
            ]
        );

        $statistics = [
            [
                'title' => 'SISWA AKTIF',
                'value' => '1.245',
                'description' => 'Siswa',
                'icon' => 'users',
                'sort_order' => 1,
            ],
            [
                'title' => 'GURU & TENDIK',
                'value' => '85',
                'description' => 'Orang',
                'icon' => 'teacher',
                'sort_order' => 2,
            ],
            [
                'title' => 'PRESTASI',
                'value' => '128+',
                'description' => 'Penghargaan',
                'icon' => 'trophy',
                'sort_order' => 3,
            ],
            [
                'title' => 'EKSTRAKURIKULER',
                'value' => '18+',
                'description' => 'Kegiatan',
                'icon' => 'list',
                'sort_order' => 4,
            ],
        ];

        foreach ($statistics as $statistic) {
            SchoolStatistic::updateOrCreate(
                ['title' => $statistic['title']],
                [
                    'value' => $statistic['value'],
                    'description' => $statistic['description'],
                    'icon' => $statistic['icon'],
                    'sort_order' => $statistic['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}