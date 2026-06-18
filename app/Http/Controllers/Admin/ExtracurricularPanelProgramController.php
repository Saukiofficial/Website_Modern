<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularPanelProgramController extends Controller
{
    public function index(): Response
    {
        $extracurriculars = Extracurricular::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Extracurricular $extracurricular) => $this->extracurricularPayload($extracurricular));

        return Inertia::render('Admin/ExtracurricularPanel/Programs/Index', [
            'extracurriculars' => $extracurriculars,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ExtracurricularPanel/Programs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:extracurriculars,slug'],
            'category' => ['nullable', 'string', 'max:255'],
            'coach_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'schedule' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: Str::slug($validated['name']),
            'category' => $validated['category'] ?? 'Ekstrakurikuler',
            'coach_name' => $validated['coach_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'schedule' => $validated['schedule'] ?? null,
            'location' => $validated['location'] ?? null,
            'icon' => $validated['icon'] ?? 'award',
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            $payload['image'] = $request->file('image')->store('academic/extracurriculars', 'public');
        }

        Extracurricular::query()->create($payload);

        return redirect()
            ->route('admin.extracurricular-panel.programs.index')
            ->with('success', 'Data ekstrakurikuler berhasil ditambahkan.');
    }

    public function edit(Extracurricular $extracurricular): Response
    {
        return Inertia::render('Admin/ExtracurricularPanel/Programs/Edit', [
            'extracurricular' => $this->extracurricularPayload($extracurricular),
        ]);
    }

    public function update(Request $request, Extracurricular $extracurricular): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('extracurriculars', 'slug')->ignore($extracurricular->id),
            ],
            'category' => ['nullable', 'string', 'max:255'],
            'coach_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'schedule' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: Str::slug($validated['name']),
            'category' => $validated['category'] ?? 'Ekstrakurikuler',
            'coach_name' => $validated['coach_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'schedule' => $validated['schedule'] ?? null,
            'location' => $validated['location'] ?? null,
            'icon' => $validated['icon'] ?? 'award',
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            if ($extracurricular->image && Storage::disk('public')->exists($extracurricular->image)) {
                Storage::disk('public')->delete($extracurricular->image);
            }

            $payload['image'] = $request->file('image')->store('academic/extracurriculars', 'public');
        }

        $extracurricular->update($payload);

        return redirect()
            ->route('admin.extracurricular-panel.programs.index')
            ->with('success', 'Data ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(Extracurricular $extracurricular): RedirectResponse
    {
        if ($extracurricular->image && Storage::disk('public')->exists($extracurricular->image)) {
            Storage::disk('public')->delete($extracurricular->image);
        }

        $extracurricular->delete();

        return redirect()
            ->route('admin.extracurricular-panel.programs.index')
            ->with('success', 'Data ekstrakurikuler berhasil dihapus.');
    }

    private function extracurricularPayload(Extracurricular $extracurricular): array
    {
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
            'image' => $extracurricular->image,
            'image_url' => $extracurricular->image_url,
            'sort_order' => $extracurricular->sort_order,
            'is_active' => $extracurricular->is_active,
        ];
    }
}
