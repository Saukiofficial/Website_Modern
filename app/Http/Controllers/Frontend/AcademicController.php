<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\AcademicCalendar;
use App\Models\AcademicPage;
use App\Models\AcademicResource;
use App\Models\Extracurricular;
use App\Models\OsisMember;
use App\Models\StudentAchievement;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

class AcademicController extends Controller
{
    public function index(): Response
    {
        $academicPage = AcademicPage::query()->first();

        if (! $academicPage) {
            $academicPage = AcademicPage::query()->create([
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
            ]);
        }

        $calendars = AcademicCalendar::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (AcademicCalendar $calendar) {
                return [
                    'id' => $calendar->id,
                    'title' => $calendar->title,
                    'description' => $calendar->description,
                    'start_date' => $calendar->start_date?->format('Y-m-d'),
                    'end_date' => $calendar->end_date?->format('Y-m-d'),
                    'date_text' => $calendar->date_text,
                    'category' => $calendar->category,
                    'icon' => $calendar->icon,
                    'sort_order' => $calendar->sort_order,
                ];
            });

        $resources = AcademicResource::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (AcademicResource $resource) {
                return [
                    'id' => $resource->id,
                    'title' => $resource->title,
                    'type' => $resource->type,
                    'file_url' => $resource->file_url,
                    'sort_order' => $resource->sort_order,
                ];
            });

        $teachers = Teacher::query()
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (Teacher $teacher) {
                return [
                    'id' => $teacher->id,
                    'name' => $teacher->name,
                    'position' => $teacher->position,
                    'subject' => $teacher->subject,
                    'education' => $teacher->education,
                    'description' => $teacher->description,
                    'image' => $teacher->image_url,
                    'email' => $teacher->email,
                    'phone' => $teacher->phone,
                    'sort_order' => $teacher->sort_order,
                    'is_featured' => $teacher->is_featured,
                ];
            });

        $extracurriculars = Extracurricular::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (Extracurricular $extracurricular) {
                return [
                    'id' => $extracurricular->id,
                    'name' => $extracurricular->name,
                    'slug' => $extracurricular->slug,
                    'category' => $extracurricular->category,
                    'coach_name' => $extracurricular->coach_name,
                    'description' => $extracurricular->description,
                    'schedule' => $extracurricular->schedule,
                    'location' => $extracurricular->location,
                    'icon' => $extracurricular->icon,
                    'image' => $extracurricular->image_url,
                    'sort_order' => $extracurricular->sort_order,
                ];
            });

        $osisMembers = OsisMember::query()
            ->where('is_active', true)
            ->orderByDesc('is_leader')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (OsisMember $member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'position' => $member->position,
                    'class_name' => $member->class_name,
                    'description' => $member->description,
                    'image' => $member->image_url,
                    'period' => $member->period,
                    'sort_order' => $member->sort_order,
                    'is_leader' => $member->is_leader,
                ];
            });

        $achievements = StudentAchievement::query()
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (StudentAchievement $achievement) {
                return [
                    'id' => $achievement->id,
                    'title' => $achievement->title,
                    'student_name' => $achievement->student_name,
                    'competition_name' => $achievement->competition_name,
                    'level' => $achievement->level,
                    'rank' => $achievement->rank,
                    'year' => $achievement->year,
                    'description' => $achievement->description,
                    'image' => $achievement->image_url,
                    'sort_order' => $achievement->sort_order,
                    'is_featured' => $achievement->is_featured,
                ];
            });

        return Inertia::render('Frontend/Academic', [
            'academicData' => [
                'page' => [
                    'hero_title' => $academicPage->hero_title,
                    'hero_subtitle' => $academicPage->hero_subtitle,
                    'hero_image' => $academicPage->hero_image_url,

                    'calendar_title' => $academicPage->calendar_title,
                    'calendar_description' => $academicPage->calendar_description,

                    'teacher_title' => $academicPage->teacher_title,
                    'teacher_description' => $academicPage->teacher_description,

                    'extracurricular_title' => $academicPage->extracurricular_title,
                    'extracurricular_description' => $academicPage->extracurricular_description,

                    'osis_title' => $academicPage->osis_title,
                    'osis_description' => $academicPage->osis_description,

                    'achievement_title' => $academicPage->achievement_title,
                    'achievement_description' => $academicPage->achievement_description,
                ],

                'calendars' => $calendars,
                'resources' => $resources,
                'teachers' => $teachers,
                'extracurriculars' => $extracurriculars,
                'osisMembers' => $osisMembers,
                'achievements' => $achievements,
            ],
        ]);
    }
}