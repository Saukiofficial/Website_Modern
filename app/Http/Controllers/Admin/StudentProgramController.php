<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class StudentProgramController extends Controller
{
    public function index(): Response
    {
        $programs = StudentProgram::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (StudentProgram $program) {
                return $this->programPayload($program);
            });

        return Inertia::render('Admin/StudentPrograms/Index', [
            'programs' => $programs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/StudentPrograms/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateProgram($request);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('hero_image')) {
            $payload['hero_image'] = $request
                ->file('hero_image')
                ->store('student-programs', 'public');
        }

        StudentProgram::query()->create($payload);

        return redirect()
            ->route('admin.student-programs.index')
            ->with('success', 'Program kesiswaan berhasil ditambahkan.');
    }

    public function edit(StudentProgram $studentProgram): Response
    {
        return Inertia::render('Admin/StudentPrograms/Edit', [
            'program' => $this->programPayload($studentProgram),
        ]);
    }

    public function update(Request $request, StudentProgram $studentProgram): RedirectResponse
    {
        $validated = $this->validateProgram($request, $studentProgram);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('hero_image')) {
            if (
                $studentProgram->hero_image &&
                Storage::disk('public')->exists($studentProgram->hero_image)
            ) {
                Storage::disk('public')->delete($studentProgram->hero_image);
            }

            $payload['hero_image'] = $request
                ->file('hero_image')
                ->store('student-programs', 'public');
        }

        $studentProgram->update($payload);

        return redirect()
            ->route('admin.student-programs.index')
            ->with('success', 'Program kesiswaan berhasil diperbarui.');
    }

    public function destroy(StudentProgram $studentProgram): RedirectResponse
    {
        if (
            $studentProgram->hero_image &&
            Storage::disk('public')->exists($studentProgram->hero_image)
        ) {
            Storage::disk('public')->delete($studentProgram->hero_image);
        }

        $studentProgram->delete();

        return redirect()
            ->route('admin.student-programs.index')
            ->with('success', 'Program kesiswaan berhasil dihapus.');
    }

    private function validateProgram(Request $request, ?StudentProgram $program = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('student_programs', 'slug')->ignore($program?->id),
            ],
            'category' => ['nullable', 'string', 'max:255'],

            'eyebrow' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'icon' => ['nullable', 'string', 'max:255'],

            'form_title' => ['nullable', 'string', 'max:255'],
            'form_description' => ['nullable', 'string'],

            'interest_label' => ['nullable', 'string', 'max:255'],
            'interest_options' => ['nullable', 'array'],
            'interest_options.*' => ['nullable', 'string', 'max:255'],

            'reason_label' => ['nullable', 'string', 'max:255'],
            'reason_placeholder' => ['nullable', 'string'],

            'points' => ['nullable', 'array'],
            'points.*' => ['nullable', 'string', 'max:255'],

            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable'],
        ]);
    }

    private function buildPayload(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'] ?: Str::slug($validated['title']),
            'category' => $validated['category'] ?? null,

            'eyebrow' => $validated['eyebrow'] ?? null,
            'hero_title' => $validated['hero_title'] ?? null,
            'description' => $validated['description'] ?? null,

            'icon' => $validated['icon'] ?? '👥',

            'form_title' => $validated['form_title'] ?? null,
            'form_description' => $validated['form_description'] ?? null,

            'interest_label' => $validated['interest_label'] ?? null,
            'interest_options' => $this->cleanStringArray($validated['interest_options'] ?? []),

            'reason_label' => $validated['reason_label'] ?? null,
            'reason_placeholder' => $validated['reason_placeholder'] ?? null,

            'points' => $this->cleanStringArray($validated['points'] ?? []),

            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];
    }

    private function cleanStringArray(array $items): array
    {
        return collect($items)
            ->map(fn ($item) => trim((string) $item))
            ->filter()
            ->values()
            ->all();
    }

    private function programPayload(StudentProgram $program): array
    {
        return [
            'id' => $program->id,
            'title' => $program->title,
            'slug' => $program->slug,
            'category' => $program->category,

            'eyebrow' => $program->eyebrow,
            'hero_title' => $program->hero_title,
            'description' => $program->description,
            'hero_image' => $program->hero_image,
            'hero_image_url' => $program->hero_image_url,

            'icon' => $program->icon,

            'form_title' => $program->form_title,
            'form_description' => $program->form_description,

            'interest_label' => $program->interest_label,
            'interest_options' => $program->interest_options ?? [],

            'reason_label' => $program->reason_label,
            'reason_placeholder' => $program->reason_placeholder,

            'points' => $program->points ?? [],

            'sort_order' => $program->sort_order,
            'is_active' => $program->is_active,
        ];
    }
}