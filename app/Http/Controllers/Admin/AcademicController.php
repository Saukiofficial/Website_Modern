<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicCalendar;
use App\Models\AcademicPage;
use App\Models\AcademicResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AcademicController extends Controller
{
    public function edit(): Response
    {
        $page = AcademicPage::query()->first();

        if (! $page) {
            $page = AcademicPage::query()->create([
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
                    'is_active' => $calendar->is_active,
                ];
            });

        $resources = AcademicResource::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (AcademicResource $resource) {
                return [
                    'id' => $resource->id,
                    'title' => $resource->title,
                    'type' => $resource->type,
                    'file_path' => $resource->file_path,
                    'file_url' => $resource->file_url,
                    'sort_order' => $resource->sort_order,
                    'is_active' => $resource->is_active,
                ];
            });

        return Inertia::render('Admin/Academics/Edit', [
            'page' => [
                'id' => $page->id,
                'hero_title' => $page->hero_title,
                'hero_subtitle' => $page->hero_subtitle,
                'hero_image_url' => $page->hero_image_url,

                'calendar_title' => $page->calendar_title,
                'calendar_description' => $page->calendar_description,

                'teacher_title' => $page->teacher_title,
                'teacher_description' => $page->teacher_description,

                'extracurricular_title' => $page->extracurricular_title,
                'extracurricular_description' => $page->extracurricular_description,

                'osis_title' => $page->osis_title,
                'osis_description' => $page->osis_description,

                'achievement_title' => $page->achievement_title,
                'achievement_description' => $page->achievement_description,
            ],
            'calendars' => $calendars,
            'resources' => $resources,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $page = AcademicPage::query()->first();

        if (! $page) {
            $page = new AcademicPage();
        }

        $validated = $request->validate([
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_subtitle' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'calendar_title' => ['nullable', 'string', 'max:255'],
            'calendar_description' => ['nullable', 'string'],

            'teacher_title' => ['nullable', 'string', 'max:255'],
            'teacher_description' => ['nullable', 'string'],

            'extracurricular_title' => ['nullable', 'string', 'max:255'],
            'extracurricular_description' => ['nullable', 'string'],

            'osis_title' => ['nullable', 'string', 'max:255'],
            'osis_description' => ['nullable', 'string'],

            'achievement_title' => ['nullable', 'string', 'max:255'],
            'achievement_description' => ['nullable', 'string'],

            'calendars' => ['nullable', 'array'],
            'calendars.*.id' => ['nullable'],
            'calendars.*.title' => ['required_with:calendars', 'string', 'max:255'],
            'calendars.*.description' => ['nullable', 'string'],
            'calendars.*.start_date' => ['nullable', 'date'],
            'calendars.*.end_date' => ['nullable', 'date'],
            'calendars.*.date_text' => ['nullable', 'string', 'max:255'],
            'calendars.*.category' => ['nullable', 'string', 'max:255'],
            'calendars.*.icon' => ['nullable', 'string', 'max:255'],
            'calendars.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'calendars.*.is_active' => ['nullable'],

            'resources' => ['nullable', 'array'],
            'resources.*.id' => ['nullable'],
            'resources.*.title' => ['required_with:resources', 'string', 'max:255'],
            'resources.*.type' => ['nullable', 'string', 'max:50'],
            'resources.*.file' => ['nullable', 'file', 'mimes:pdf,doc,docx,xls,xlsx', 'max:10240'],
            'resources.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'resources.*.is_active' => ['nullable'],
        ]);

        $pagePayload = [
            'hero_title' => $validated['hero_title'] ?? null,
            'hero_subtitle' => $validated['hero_subtitle'] ?? null,

            'calendar_title' => $validated['calendar_title'] ?? null,
            'calendar_description' => $validated['calendar_description'] ?? null,

            'teacher_title' => $validated['teacher_title'] ?? null,
            'teacher_description' => $validated['teacher_description'] ?? null,

            'extracurricular_title' => $validated['extracurricular_title'] ?? null,
            'extracurricular_description' => $validated['extracurricular_description'] ?? null,

            'osis_title' => $validated['osis_title'] ?? null,
            'osis_description' => $validated['osis_description'] ?? null,

            'achievement_title' => $validated['achievement_title'] ?? null,
            'achievement_description' => $validated['achievement_description'] ?? null,
        ];

        if ($request->hasFile('hero_image')) {
            if ($page->hero_image && Storage::disk('public')->exists($page->hero_image)) {
                Storage::disk('public')->delete($page->hero_image);
            }

            $pagePayload['hero_image'] = $request->file('hero_image')->store('academic', 'public');
        }

        $page->fill($pagePayload);
        $page->save();

        $calendarIds = [];

        foreach ($validated['calendars'] ?? [] as $index => $calendarData) {
            $calendar = ! empty($calendarData['id'])
                ? AcademicCalendar::query()->find($calendarData['id'])
                : new AcademicCalendar();

            if (! $calendar) {
                $calendar = new AcademicCalendar();
            }

            $calendar->fill([
                'title' => $calendarData['title'],
                'description' => $calendarData['description'] ?? null,
                'start_date' => $calendarData['start_date'] ?? null,
                'end_date' => $calendarData['end_date'] ?? null,
                'date_text' => $calendarData['date_text'] ?? null,
                'category' => $calendarData['category'] ?? 'Akademik',
                'icon' => $calendarData['icon'] ?? '📅',
                'sort_order' => $calendarData['sort_order'] ?? $index + 1,
                'is_active' => filter_var($calendarData['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ]);

            $calendar->save();

            $calendarIds[] = $calendar->id;
        }

        AcademicCalendar::query()
            ->whereNotIn('id', $calendarIds)
            ->delete();

        $resourceIds = [];

        foreach ($validated['resources'] ?? [] as $index => $resourceData) {
            $resource = ! empty($resourceData['id'])
                ? AcademicResource::query()->find($resourceData['id'])
                : new AcademicResource();

            if (! $resource) {
                $resource = new AcademicResource();
            }

            $resource->fill([
                'title' => $resourceData['title'],
                'type' => $resourceData['type'] ?? 'PDF',
                'sort_order' => $resourceData['sort_order'] ?? $index + 1,
                'is_active' => filter_var($resourceData['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ]);

            if ($request->hasFile("resources.$index.file")) {
                if ($resource->file_path && Storage::disk('public')->exists($resource->file_path)) {
                    Storage::disk('public')->delete($resource->file_path);
                }

                $resource->file_path = $request
                    ->file("resources.$index.file")
                    ->store('academic/resources', 'public');
            }

            $resource->save();

            $resourceIds[] = $resource->id;
        }

        $deletedResources = AcademicResource::query()
            ->whereNotIn('id', $resourceIds)
            ->get();

        foreach ($deletedResources as $deletedResource) {
            if ($deletedResource->file_path && Storage::disk('public')->exists($deletedResource->file_path)) {
                Storage::disk('public')->delete($deletedResource->file_path);
            }

            $deletedResource->delete();
        }

        return redirect()
            ->route('admin.academics.edit')
            ->with('success', 'Data akademik berhasil diperbarui.');
    }
}