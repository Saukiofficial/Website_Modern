<?php

namespace Database\Seeders;

use App\Models\AcademicCalendar;
use App\Models\AcademicPage;
use App\Models\Extracurricular;
use App\Models\OsisMember;
use App\Models\StudentAchievement;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AcademicSeeder extends Seeder
{
    public function run(): void
    {
        AcademicPage::updateOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Akademik Sekolah',
                'hero_subtitle' => 'Informasi akademik, kalender pendidikan, guru, ekstrakurikuler, OSIS, dan prestasi siswa.',
                'hero_image' => '/frontend/images/academic-hero.jpg',

                'calendar_title' => 'Kalender Akademik',
                'calendar_description' => 'Informasi jadwal kegiatan akademik sekolah selama tahun pelajaran berjalan.',

                'teacher_title' => 'Dewan Guru',
                'teacher_description' => 'Tenaga pendidik profesional yang mendukung proses belajar siswa.',

                'extracurricular_title' => 'Ekstrakurikuler',
                'extracurricular_description' => 'Kegiatan pengembangan minat, bakat, karakter, dan kreativitas siswa.',

                'osis_title' => 'Pengurus OSIS',
                'osis_description' => 'Organisasi siswa sebagai wadah kepemimpinan, kreativitas, dan tanggung jawab.',

                'achievement_title' => 'Prestasi Siswa',
                'achievement_description' => 'Daftar prestasi akademik dan non-akademik yang diraih oleh siswa.',
            ]
        );

        $calendars = [
            [
                'title' => 'Awal Tahun Pelajaran',
                'description' => 'Kegiatan awal masuk sekolah dan pengenalan lingkungan belajar.',
                'date_text' => '15 Juli 2026',
                'category' => 'Akademik',
                'icon' => '📘',
                'sort_order' => 1,
            ],
            [
                'title' => 'Penilaian Tengah Semester',
                'description' => 'Evaluasi pembelajaran tengah semester.',
                'date_text' => 'September 2026',
                'category' => 'Ujian',
                'icon' => '📝',
                'sort_order' => 2,
            ],
            [
                'title' => 'Penilaian Akhir Semester',
                'description' => 'Evaluasi akhir semester ganjil.',
                'date_text' => 'Desember 2026',
                'category' => 'Ujian',
                'icon' => '📄',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pembagian Rapor',
                'description' => 'Pembagian hasil belajar siswa kepada orang tua.',
                'date_text' => 'Akhir Semester',
                'category' => 'Akademik',
                'icon' => '🎓',
                'sort_order' => 4,
            ],
        ];

        foreach ($calendars as $calendar) {
            AcademicCalendar::updateOrCreate(
                ['title' => $calendar['title']],
                [
                    'description' => $calendar['description'],
                    'date_text' => $calendar['date_text'],
                    'category' => $calendar['category'],
                    'icon' => $calendar['icon'],
                    'sort_order' => $calendar['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        $teachers = [
            [
                'name' => 'Drs. Ahmad Fauzi, M.Pd.',
                'position' => 'Kepala Sekolah',
                'subject' => 'Manajemen Pendidikan',
                'education' => 'S2 Pendidikan',
                'description' => 'Memimpin sekolah dan mengawasi pengembangan akademik serta karakter siswa.',
                'image' => '/frontend/images/principal.jpg',
                'sort_order' => 1,
                'is_featured' => true,
            ],
            [
                'name' => 'Dra. Siti Aminah',
                'position' => 'Guru Matematika',
                'subject' => 'Matematika',
                'education' => 'S1 Pendidikan Matematika',
                'description' => 'Mengajar matematika dan membimbing siswa dalam olimpiade sains.',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85',
                'sort_order' => 2,
                'is_featured' => true,
            ],
            [
                'name' => 'M. Ridwan, S.Pd.',
                'position' => 'Guru Bahasa Indonesia',
                'subject' => 'Bahasa Indonesia',
                'education' => 'S1 Pendidikan Bahasa Indonesia',
                'description' => 'Membina kemampuan literasi, menulis, dan komunikasi siswa.',
                'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
                'sort_order' => 3,
                'is_featured' => false,
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::updateOrCreate(
                ['name' => $teacher['name']],
                [
                    'position' => $teacher['position'],
                    'subject' => $teacher['subject'],
                    'education' => $teacher['education'],
                    'description' => $teacher['description'],
                    'image' => $teacher['image'],
                    'sort_order' => $teacher['sort_order'],
                    'is_featured' => $teacher['is_featured'],
                    'is_active' => true,
                ]
            );
        }

        $extracurriculars = [
            [
                'name' => 'Pramuka',
                'category' => 'Kepemimpinan',
                'coach_name' => 'Bapak Ridwan',
                'description' => 'Kegiatan pembentukan karakter, disiplin, dan kepemimpinan siswa.',
                'schedule' => 'Jumat, 15.00 WIB',
                'location' => 'Lapangan Sekolah',
                'icon' => '🏕️',
                'image' => '/frontend/images/extracurricular-pramuka.jpg',
                'sort_order' => 1,
            ],
            [
                'name' => 'Paskibra',
                'category' => 'Kedisiplinan',
                'coach_name' => 'Ibu Siti Aminah',
                'description' => 'Kegiatan baris-berbaris, kedisiplinan, dan nasionalisme.',
                'schedule' => 'Sabtu, 08.00 WIB',
                'location' => 'Lapangan Sekolah',
                'icon' => '🇮🇩',
                'image' => '/frontend/images/extracurricular-paskibra.jpg',
                'sort_order' => 2,
            ],
            [
                'name' => 'Basket',
                'category' => 'Olahraga',
                'coach_name' => 'Bapak Hendra',
                'description' => 'Kegiatan olahraga basket untuk meningkatkan kerja sama dan sportivitas.',
                'schedule' => 'Rabu, 15.30 WIB',
                'location' => 'Lapangan Basket',
                'icon' => '🏀',
                'image' => '/frontend/images/extracurricular-basket.jpg',
                'sort_order' => 3,
            ],
        ];

        foreach ($extracurriculars as $extracurricular) {
            Extracurricular::updateOrCreate(
                ['slug' => Str::slug($extracurricular['name'])],
                [
                    'name' => $extracurricular['name'],
                    'category' => $extracurricular['category'],
                    'coach_name' => $extracurricular['coach_name'],
                    'description' => $extracurricular['description'],
                    'schedule' => $extracurricular['schedule'],
                    'location' => $extracurricular['location'],
                    'icon' => $extracurricular['icon'],
                    'image' => $extracurricular['image'],
                    'sort_order' => $extracurricular['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        $osisMembers = [
            [
                'name' => 'Rafi Alfarizi',
                'position' => 'Ketua OSIS',
                'class_name' => 'XI IPA 1',
                'description' => 'Memimpin program kerja OSIS dan mengkoordinasikan kegiatan siswa.',
                'image' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
                'period' => '2026/2027',
                'sort_order' => 1,
                'is_leader' => true,
            ],
            [
                'name' => 'Nadia Putri',
                'position' => 'Wakil Ketua OSIS',
                'class_name' => 'XI IPS 1',
                'description' => 'Mendampingi ketua OSIS dan membantu pelaksanaan program kerja.',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
                'period' => '2026/2027',
                'sort_order' => 2,
                'is_leader' => true,
            ],
        ];

        foreach ($osisMembers as $member) {
            OsisMember::updateOrCreate(
                ['name' => $member['name']],
                [
                    'position' => $member['position'],
                    'class_name' => $member['class_name'],
                    'description' => $member['description'],
                    'image' => $member['image'],
                    'period' => $member['period'],
                    'sort_order' => $member['sort_order'],
                    'is_leader' => $member['is_leader'],
                    'is_active' => true,
                ]
            );
        }

        $achievements = [
            [
                'title' => 'Juara 1 Olimpiade Matematika Tingkat Kota',
                'student_name' => 'Aulia Rahman',
                'competition_name' => 'Olimpiade Matematika Kota',
                'level' => 'Kota',
                'rank' => 'Juara 1',
                'year' => '2026',
                'description' => 'Prestasi membanggakan dalam kompetisi matematika tingkat kota.',
                'image' => '/frontend/images/achievement-1.jpg',
                'sort_order' => 1,
                'is_featured' => true,
            ],
            [
                'title' => 'Juara 2 Lomba Karya Tulis Ilmiah',
                'student_name' => 'Dewi Lestari',
                'competition_name' => 'LKTI Pelajar',
                'level' => 'Provinsi',
                'rank' => 'Juara 2',
                'year' => '2026',
                'description' => 'Prestasi dalam bidang karya tulis ilmiah tingkat provinsi.',
                'image' => '/frontend/images/achievement-2.jpg',
                'sort_order' => 2,
                'is_featured' => true,
            ],
        ];

        foreach ($achievements as $achievement) {
            StudentAchievement::updateOrCreate(
                ['title' => $achievement['title']],
                [
                    'student_name' => $achievement['student_name'],
                    'competition_name' => $achievement['competition_name'],
                    'level' => $achievement['level'],
                    'rank' => $achievement['rank'],
                    'year' => $achievement['year'],
                    'description' => $achievement['description'],
                    'image' => $achievement['image'],
                    'sort_order' => $achievement['sort_order'],
                    'is_featured' => $achievement['is_featured'],
                    'is_active' => true,
                ]
            );
        }
    }
}