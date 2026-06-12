<?php

namespace Database\Seeders;

use App\Models\OrganizationStructure;
use App\Models\OrganizationUnit;
use App\Models\SchoolProfile;
use Illuminate\Database\Seeder;

class SchoolProfileSeeder extends Seeder
{
    public function run(): void
    {
        SchoolProfile::updateOrCreate(
            ['id' => 1],
            [
                'school_name' => 'SMA Negeri 1 Sumenep',
                'short_name' => 'SMA Negeri 1',
                'city' => 'Sumenep',
                'tagline' => 'Berprestasi, Berkarakter, Berbudaya',
                'description' => 'SMA Negeri 1 Cerdas merupakan sekolah menengah atas yang berkomitmen membentuk peserta didik yang unggul dalam akademik, berkarakter, kreatif, berbudaya, serta siap bersaing di era global.',

                'hero_image' => '/frontend/images/profile-hero.jpg',
                'vision_hero_image' => '/frontend/images/vision-hero.jpg',
                'structure_hero_image' => '/frontend/images/structure-hero.jpg',
                'history_image' => '/frontend/images/history-school.jpg',
                'identity_image' => '/frontend/images/identity-school.jpg',
                'vision_banner_image' => '/frontend/images/vision-banner.jpg',

                'principal_name' => 'Drs. Ahmad Fauzi, M.Pd.',
                'principal_position' => 'Kepala Sekolah',
                'principal_image' => '/frontend/images/principal.jpg',
                'principal_message' => 'Kami percaya bahwa pendidikan bukan hanya tentang pengetahuan, tetapi juga tentang pembentukan karakter, kedisiplinan, tanggung jawab, dan kepedulian sosial. Melalui lingkungan belajar yang nyaman dan modern, kami terus mendorong peserta didik untuk berkembang sesuai potensi terbaiknya.',

                'history' => 'SMA Negeri 1 Cerdas berdiri sebagai lembaga pendidikan yang hadir untuk menjawab kebutuhan masyarakat terhadap sekolah berkualitas. Sejak awal berdiri, sekolah ini terus berkembang dalam bidang akademik, sarana prasarana, kegiatan siswa, serta layanan pendidikan berbasis teknologi.',
                'vision' => 'Menjadi sekolah unggul yang melahirkan generasi cerdas, berkarakter, berbudaya, dan berdaya saing global.',

                'missions' => [
                    'Menyelenggarakan pendidikan yang berkualitas, inovatif, dan berorientasi pada perkembangan peserta didik.',
                    'Membentuk karakter siswa yang disiplin, religius, bertanggung jawab, dan peduli lingkungan.',
                    'Mengembangkan potensi akademik dan non-akademik siswa melalui pembelajaran aktif dan kegiatan ekstrakurikuler.',
                    'Meningkatkan profesionalitas guru dan tenaga kependidikan secara berkelanjutan.',
                    'Membangun kerja sama dengan orang tua, masyarakat, dan berbagai pihak dalam mendukung kemajuan sekolah.',
                ],

                'identity' => [
                    ['label' => 'Nama Sekolah', 'value' => 'SMA Negeri 1 Sumenep'],
                    ['label' => 'NPSN', 'value' => '20500001'],
                    ['label' => 'Akreditasi', 'value' => 'A'],
                    ['label' => 'Status Sekolah', 'value' => 'Negeri'],
                    ['label' => 'Jenjang', 'value' => 'Sekolah Menengah Atas'],
                    ['label' => 'Kurikulum', 'value' => 'Kurikulum Merdeka'],
                    ['label' => 'Alamat', 'value' => 'Jl. Pendidikan No. 21, Sumenep, Jawa Timur'],
                    ['label' => 'Email', 'value' => 'info@sman1Sumenep.sch.id'],
                    ['label' => 'Telepon', 'value' => '0812-3456-7890'],
                    ['label' => 'Tahun Berdiri', 'value' => '1998'],
                ],

                'values' => [
                    [
                        'title' => 'Berprestasi',
                        'icon' => '🏆',
                        'description' => 'Mendorong siswa untuk unggul dalam akademik, lomba, dan berbagai kompetisi.',
                    ],
                    [
                        'title' => 'Berkarakter',
                        'icon' => '🤝',
                        'description' => 'Membentuk pribadi disiplin, jujur, bertanggung jawab, dan peduli sesama.',
                    ],
                    [
                        'title' => 'Berbudaya',
                        'icon' => '🌿',
                        'description' => 'Menanamkan nilai budaya, sopan santun, serta cinta terhadap lingkungan sekolah.',
                    ],
                ],

                'profile_stats' => [
                    [
                        'value' => '900+',
                        'label' => 'Peserta Didik Aktif',
                        'icon' => '👥',
                    ],
                    [
                        'value' => '60+',
                        'label' => 'Tenaga Pendidik',
                        'icon' => '🧑‍🏫',
                    ],
                    [
                        'value' => '20+',
                        'label' => 'Ruang Kelas Modern',
                        'icon' => '🏫',
                    ],
                    [
                        'value' => '100+',
                        'label' => 'Prestasi Diraih',
                        'icon' => '🏆',
                    ],
                ],

                'hero_stats' => [
                    [
                        'value' => '25+',
                        'label' => 'Tahun Pengalaman Pendidikan',
                        'icon' => '🎓',
                    ],
                    [
                        'value' => 'A',
                        'label' => 'Akreditasi Sekolah',
                        'icon' => '🏅',
                    ],
                    [
                        'value' => "Berprestasi\nBerkarakter\nBerbudaya",
                        'label' => '',
                        'icon' => '👥',
                    ],
                ],

                'history_timeline' => [
                    [
                        'year' => '1998',
                        'title' => 'Pendirian Sekolah',
                        'description' => 'SMA Negeri 1 Cerdas mulai berdiri dan melayani pendidikan.',
                        'active' => false,
                    ],
                    [
                        'year' => '2005',
                        'title' => 'Pengembangan Fasilitas',
                        'description' => 'Pengembangan fasilitas dan sarana belajar modern.',
                        'active' => false,
                    ],
                    [
                        'year' => '2011',
                        'title' => 'Implementasi Teknologi',
                        'description' => 'Teknologi mulai diterapkan dalam proses pembelajaran.',
                        'active' => false,
                    ],
                    [
                        'year' => '2016',
                        'title' => 'Penguatan Karakter',
                        'description' => 'Program karakter dan budaya sekolah semakin diperkuat.',
                        'active' => false,
                    ],
                    [
                        'year' => '2020',
                        'title' => 'Kolaborasi Nasional',
                        'description' => 'Sekolah membangun jejaring dan kolaborasi nasional.',
                        'active' => false,
                    ],
                    [
                        'year' => 'Sekarang',
                        'title' => 'Terus Berinovasi',
                        'description' => 'Terus berinovasi untuk masa depan pendidikan.',
                        'active' => true,
                    ],
                ],

                'vision_mission_items' => [
                    [
                        'title' => 'Pendidikan Berkualitas',
                        'description' => 'Menyelenggarakan pendidikan yang berkualitas, inovatif, dan berorientasi pada perkembangan peserta didik.',
                        'icon' => '🎓',
                    ],
                    [
                        'title' => 'Karakter & Kepedulian',
                        'description' => 'Membentuk karakter siswa yang disiplin, religius, bertanggung jawab, dan peduli terhadap lingkungan.',
                        'icon' => '🧑‍🏫',
                    ],
                    [
                        'title' => 'Pengembangan Potensi',
                        'description' => 'Mengembangkan potensi akademik dan non-akademik siswa melalui pembelajaran aktif dan kegiatan ekstrakurikuler.',
                        'icon' => '🏁',
                    ],
                    [
                        'title' => 'Profesionalisme',
                        'description' => 'Meningkatkan profesionalitas guru dan tenaga kependidikan secara berkelanjutan.',
                        'icon' => '💡',
                    ],
                    [
                        'title' => 'Kolaborasi',
                        'description' => 'Membangun kerja sama dengan orang tua, masyarakat, dan berbagai pihak dalam mendukung kemajuan sekolah.',
                        'icon' => '🌐',
                    ],
                ],

                'core_values' => [
                    [
                        'title' => 'Excellence',
                        'description' => 'Berkomitmen pada mutu dan prestasi terbaik dalam setiap aspek.',
                        'icon' => '☆',
                    ],
                    [
                        'title' => 'Integrity',
                        'description' => 'Menjunjung tinggi kejujuran, integritas, dan tanggung jawab.',
                        'icon' => '🛡️',
                    ],
                    [
                        'title' => 'Respect',
                        'description' => 'Menghargai perbedaan dan menumbuhkan budaya saling menghormati.',
                        'icon' => '🤝',
                    ],
                    [
                        'title' => 'Innovation',
                        'description' => 'Terbuka terhadap ide baru dan terus berinovasi untuk masa depan.',
                        'icon' => '💡',
                    ],
                    [
                        'title' => 'Global Citizenship',
                        'description' => 'Berwawasan global dan berkontribusi positif bagi masyarakat dunia.',
                        'icon' => '🌐',
                    ],
                ],

                'vision_action_steps' => [
                    [
                        'title' => 'Visi',
                        'description' => 'Arah dan tujuan jangka panjang sekolah.',
                        'icon' => '👁️',
                        'active' => true,
                        'gold' => false,
                    ],
                    [
                        'title' => 'Misi',
                        'description' => 'Langkah strategis untuk mencapai visi.',
                        'icon' => '🎯',
                        'active' => false,
                        'gold' => false,
                    ],
                    [
                        'title' => 'Program',
                        'description' => 'Kurikulum, kegiatan, dan layanan pendukung.',
                        'icon' => '📖',
                        'active' => false,
                        'gold' => false,
                    ],
                    [
                        'title' => 'Pembentukan Karakter',
                        'description' => 'Siswa tumbuh menjadi pribadi unggul dan berdaya saing.',
                        'icon' => '👥',
                        'active' => false,
                        'gold' => false,
                    ],
                    [
                        'title' => 'Prestasi',
                        'description' => 'Mewujudkan capaian akademik dan non-akademik.',
                        'icon' => '🏆',
                        'active' => false,
                        'gold' => true,
                    ],
                ],
            ]
        );

        $leaders = [
            [
                'role' => 'Kepala Sekolah',
                'name' => 'Drs. Ahmad Fauzi, M.Pd.',
                'description' => 'Memimpin dan bertanggung jawab atas penyelenggaraan pendidikan secara menyeluruh di SMA Negeri 1 Sumenep.',
                'image' => '/frontend/images/principal.jpg',
                'fallback_image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85',
                'sort_order' => 1,
                'is_principal' => true,
            ],
            [
                'role' => 'Waka Kurikulum',
                'name' => 'Dra. Siti Aminah',
                'description' => 'Bertanggung jawab atas pengembangan kurikulum, proses pembelajaran, dan penilaian akademik.',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85',
                'fallback_image' => null,
                'sort_order' => 2,
                'is_principal' => false,
            ],
            [
                'role' => 'Waka Kesiswaan',
                'name' => 'M. Ridwan, S.Pd.',
                'description' => 'Bertanggung jawab atas pembinaan kesiswaan, disiplin, prestasi, dan kegiatan siswa.',
                'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
                'fallback_image' => null,
                'sort_order' => 3,
                'is_principal' => false,
            ],
            [
                'role' => 'Waka Sarpras',
                'name' => 'Nur Laila, S.Pd.',
                'description' => 'Bertanggung jawab atas sarana prasarana, fasilitas, dan pengelolaan lingkungan sekolah.',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
                'fallback_image' => null,
                'sort_order' => 4,
                'is_principal' => false,
            ],
            [
                'role' => 'Kepala Tata Usaha',
                'name' => 'Hendra Wijaya, S.Kom.',
                'description' => 'Bertanggung jawab atas administrasi, keuangan, kepegawaian, dan layanan administratif sekolah.',
                'image' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
                'fallback_image' => null,
                'sort_order' => 5,
                'is_principal' => false,
            ],
        ];

        foreach ($leaders as $leader) {
            OrganizationStructure::updateOrCreate(
                ['role' => $leader['role']],
                [
                    'name' => $leader['name'],
                    'description' => $leader['description'],
                    'image' => $leader['image'],
                    'fallback_image' => $leader['fallback_image'],
                    'sort_order' => $leader['sort_order'],
                    'is_principal' => $leader['is_principal'],
                    'is_active' => true,
                ]
            );
        }

        $units = [
            [
                'title' => 'Guru & Tenaga Pendidik',
                'description' => 'Melaksanakan kegiatan belajar mengajar serta membimbing siswa secara akademik dan karakter.',
                'icon' => '📖',
                'sort_order' => 1,
            ],
            [
                'title' => 'Wali Kelas',
                'description' => 'Membina, membimbing, dan memantau perkembangan akademik serta karakter siswa di kelas.',
                'icon' => '👥',
                'sort_order' => 2,
            ],
            [
                'title' => 'Pembina Ekstrakurikuler',
                'description' => 'Mengembangkan minat, bakat, dan potensi siswa melalui kegiatan ekstrakurikuler yang beragam.',
                'icon' => '👨‍👩‍👧‍👦',
                'sort_order' => 3,
            ],
            [
                'title' => 'Layanan Pendukung',
                'description' => 'Mendukung kelancaran kegiatan sekolah melalui layanan BK, perpustakaan, laboratorium, dan unit lainnya.',
                'icon' => '🤝',
                'sort_order' => 4,
            ],
            [
                'title' => 'Komite Sekolah',
                'description' => 'Bersinergi dengan sekolah dalam meningkatkan mutu pendidikan dan pelayanan kepada siswa.',
                'icon' => '👨‍👩‍👧',
                'sort_order' => 5,
            ],
        ];

        foreach ($units as $unit) {
            OrganizationUnit::updateOrCreate(
                ['title' => $unit['title']],
                [
                    'description' => $unit['description'],
                    'icon' => $unit['icon'],
                    'sort_order' => $unit['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}