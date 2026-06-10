<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use App\Models\SchoolStatistic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeSectionController extends Controller
{
    public function edit(): Response
    {
        $homeSection = HomeSection::query()->first();

        if (! $homeSection) {
            $homeSection = HomeSection::query()->create([
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
            ]);
        }

        $statistics = SchoolStatistic::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (SchoolStatistic $statistic) {
                return [
                    'id' => $statistic->id,
                    'title' => $statistic->title,
                    'value' => $statistic->value,
                    'description' => $statistic->description,
                    'icon' => $statistic->icon,
                    'sort_order' => $statistic->sort_order,
                    'is_active' => $statistic->is_active,
                ];
            });

        return Inertia::render('Admin/Home/Edit', [
            'homeSection' => [
                'id' => $homeSection->id,
                'hero_title' => $homeSection->hero_title,
                'hero_subtitle' => $homeSection->hero_subtitle,
                'hero_button_text' => $homeSection->hero_button_text,
                'hero_button_url' => $homeSection->hero_button_url,
                'hero_background' => $homeSection->hero_background,
                'hero_background_url' => $homeSection->hero_background_url,
                'hero_image' => $homeSection->hero_image,
                'hero_image_url' => $homeSection->hero_image_url,
                'ppdb_title' => $homeSection->ppdb_title,
                'ppdb_description' => $homeSection->ppdb_description,
                'ppdb_button_text' => $homeSection->ppdb_button_text,
                'ppdb_button_url' => $homeSection->ppdb_button_url,
            ],
            'statistics' => $statistics,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $homeSection = HomeSection::query()->first();

        if (! $homeSection) {
            $homeSection = new HomeSection();
        }

        $validated = $request->validate([
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_subtitle' => ['nullable', 'string'],
            'hero_button_text' => ['nullable', 'string', 'max:255'],
            'hero_button_url' => ['nullable', 'string', 'max:255'],
            'hero_background' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'ppdb_title' => ['nullable', 'string', 'max:255'],
            'ppdb_description' => ['nullable', 'string'],
            'ppdb_button_text' => ['nullable', 'string', 'max:255'],
            'ppdb_button_url' => ['nullable', 'string', 'max:255'],

            'statistics' => ['nullable', 'array'],
            'statistics.*.id' => ['nullable'],
            'statistics.*.title' => ['required_with:statistics', 'string', 'max:255'],
            'statistics.*.value' => ['required_with:statistics', 'string', 'max:255'],
            'statistics.*.description' => ['nullable', 'string', 'max:255'],
            'statistics.*.icon' => ['nullable', 'string', 'max:255'],
            'statistics.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'statistics.*.is_active' => ['nullable'],
        ]);

        $homeData = [
            'hero_title' => $validated['hero_title'] ?? null,
            'hero_subtitle' => $validated['hero_subtitle'] ?? null,
            'hero_button_text' => $validated['hero_button_text'] ?? null,
            'hero_button_url' => $validated['hero_button_url'] ?? null,
            'ppdb_title' => $validated['ppdb_title'] ?? null,
            'ppdb_description' => $validated['ppdb_description'] ?? null,
            'ppdb_button_text' => $validated['ppdb_button_text'] ?? null,
            'ppdb_button_url' => $validated['ppdb_button_url'] ?? null,
        ];

        if ($request->hasFile('hero_background')) {
            if ($homeSection->hero_background && Storage::disk('public')->exists($homeSection->hero_background)) {
                Storage::disk('public')->delete($homeSection->hero_background);
            }

            $homeData['hero_background'] = $request->file('hero_background')->store('home/hero', 'public');
        }

        if ($request->hasFile('hero_image')) {
            if ($homeSection->hero_image && Storage::disk('public')->exists($homeSection->hero_image)) {
                Storage::disk('public')->delete($homeSection->hero_image);
            }

            $homeData['hero_image'] = $request->file('hero_image')->store('home/hero', 'public');
        }

        $homeSection->fill($homeData);
        $homeSection->save();

        $submittedStatistics = collect($validated['statistics'] ?? []);
        $submittedIds = [];

        foreach ($submittedStatistics as $index => $statisticData) {
            $id = $statisticData['id'] ?? null;

            $statistic = $id
                ? SchoolStatistic::query()->find($id)
                : new SchoolStatistic();

            if (! $statistic) {
                $statistic = new SchoolStatistic();
            }

            $statistic->fill([
                'title' => $statisticData['title'],
                'value' => $statisticData['value'],
                'description' => $statisticData['description'] ?? null,
                'icon' => $statisticData['icon'] ?? 'list',
                'sort_order' => $statisticData['sort_order'] ?? $index + 1,
                'is_active' => filter_var($statisticData['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ]);

            $statistic->save();

            $submittedIds[] = $statistic->id;
        }

        SchoolStatistic::query()
            ->whereNotIn('id', $submittedIds)
            ->delete();

        return redirect()
            ->route('admin.home.edit')
            ->with('success', 'Konten beranda berhasil diperbarui.');
    }
}