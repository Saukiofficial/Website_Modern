<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentAchievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AcademicAchievementController extends Controller
{
    public function index(): Response
    {
        $achievements = StudentAchievement::query()
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
                    'image' => $achievement->image,
                    'image_url' => $achievement->image_url,
                    'sort_order' => $achievement->sort_order,
                    'is_featured' => $achievement->is_featured,
                    'is_active' => $achievement->is_active,
                ];
            });

        return Inertia::render('Admin/Academics/Achievements/Index', [
            'achievements' => $achievements,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Academics/Achievements/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'student_name' => ['nullable', 'string', 'max:255'],
            'competition_name' => ['nullable', 'string', 'max:255'],
            'level' => ['nullable', 'string', 'max:255'],
            'rank' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'title' => $validated['title'],
            'student_name' => $validated['student_name'] ?? null,
            'competition_name' => $validated['competition_name'] ?? null,
            'level' => $validated['level'] ?? null,
            'rank' => $validated['rank'] ?? null,
            'year' => $validated['year'] ?? null,
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            $payload['image'] = $request->file('image')->store('academic/achievements', 'public');
        }

        StudentAchievement::query()->create($payload);

        return redirect()
            ->route('admin.academics.achievements.index')
            ->with('success', 'Data prestasi siswa berhasil ditambahkan.');
    }

    public function edit(StudentAchievement $achievement): Response
    {
        return Inertia::render('Admin/Academics/Achievements/Edit', [
            'achievement' => [
                'id' => $achievement->id,
                'title' => $achievement->title,
                'student_name' => $achievement->student_name,
                'competition_name' => $achievement->competition_name,
                'level' => $achievement->level,
                'rank' => $achievement->rank,
                'year' => $achievement->year,
                'description' => $achievement->description,
                'image' => $achievement->image,
                'image_url' => $achievement->image_url,
                'sort_order' => $achievement->sort_order,
                'is_featured' => $achievement->is_featured,
                'is_active' => $achievement->is_active,
            ],
        ]);
    }

    public function update(Request $request, StudentAchievement $achievement): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'student_name' => ['nullable', 'string', 'max:255'],
            'competition_name' => ['nullable', 'string', 'max:255'],
            'level' => ['nullable', 'string', 'max:255'],
            'rank' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'title' => $validated['title'],
            'student_name' => $validated['student_name'] ?? null,
            'competition_name' => $validated['competition_name'] ?? null,
            'level' => $validated['level'] ?? null,
            'rank' => $validated['rank'] ?? null,
            'year' => $validated['year'] ?? null,
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            if ($achievement->image && Storage::disk('public')->exists($achievement->image)) {
                Storage::disk('public')->delete($achievement->image);
            }

            $payload['image'] = $request->file('image')->store('academic/achievements', 'public');
        }

        $achievement->update($payload);

        return redirect()
            ->route('admin.academics.achievements.index')
            ->with('success', 'Data prestasi siswa berhasil diperbarui.');
    }

    public function destroy(StudentAchievement $achievement): RedirectResponse
    {
        if ($achievement->image && Storage::disk('public')->exists($achievement->image)) {
            Storage::disk('public')->delete($achievement->image);
        }

        $achievement->delete();

        return redirect()
            ->route('admin.academics.achievements.index')
            ->with('success', 'Data prestasi siswa berhasil dihapus.');
    }
}