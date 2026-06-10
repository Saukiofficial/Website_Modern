<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AcademicTeacherController extends Controller
{
    public function index(): Response
    {
        $teachers = Teacher::query()
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
                    'image' => $teacher->image,
                    'image_url' => $teacher->image_url,
                    'email' => $teacher->email,
                    'phone' => $teacher->phone,
                    'sort_order' => $teacher->sort_order,
                    'is_featured' => $teacher->is_featured,
                    'is_active' => $teacher->is_active,
                ];
            });

        return Inertia::render('Admin/Academics/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Academics/Teachers/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'education' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'position' => $validated['position'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'education' => $validated['education'] ?? null,
            'description' => $validated['description'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            $payload['image'] = $request->file('image')->store('academic/teachers', 'public');
        }

        Teacher::query()->create($payload);

        return redirect()
            ->route('admin.academics.teachers.index')
            ->with('success', 'Data guru berhasil ditambahkan.');
    }

    public function edit(Teacher $teacher): Response
    {
        return Inertia::render('Admin/Academics/Teachers/Edit', [
            'teacher' => [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'position' => $teacher->position,
                'subject' => $teacher->subject,
                'education' => $teacher->education,
                'description' => $teacher->description,
                'image' => $teacher->image,
                'image_url' => $teacher->image_url,
                'email' => $teacher->email,
                'phone' => $teacher->phone,
                'sort_order' => $teacher->sort_order,
                'is_featured' => $teacher->is_featured,
                'is_active' => $teacher->is_active,
            ],
        ]);
    }

    public function update(Request $request, Teacher $teacher): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'education' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'position' => $validated['position'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'education' => $validated['education'] ?? null,
            'description' => $validated['description'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            if ($teacher->image && Storage::disk('public')->exists($teacher->image)) {
                Storage::disk('public')->delete($teacher->image);
            }

            $payload['image'] = $request->file('image')->store('academic/teachers', 'public');
        }

        $teacher->update($payload);

        return redirect()
            ->route('admin.academics.teachers.index')
            ->with('success', 'Data guru berhasil diperbarui.');
    }

    public function destroy(Teacher $teacher): RedirectResponse
    {
        if ($teacher->image && Storage::disk('public')->exists($teacher->image)) {
            Storage::disk('public')->delete($teacher->image);
        }

        $teacher->delete();

        return redirect()
            ->route('admin.academics.teachers.index')
            ->with('success', 'Data guru berhasil dihapus.');
    }
}