<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbRequirement;
use App\Models\PpdbStep;
use App\Models\PpdbTimeline;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PpdbPanelContentController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/PpdbPanel/Content/Edit', [
            'timelines' => PpdbTimeline::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbTimeline $timeline) => [
                    'id' => $timeline->id,
                    'title' => $timeline->title,
                    'date_text' => $timeline->date_text,
                    'icon' => $timeline->icon,
                    'sort_order' => $timeline->sort_order,
                    'is_active' => (bool) $timeline->is_active,
                ]),

            'steps' => PpdbStep::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbStep $step) => [
                    'id' => $step->id,
                    'number' => $step->number,
                    'step_label' => $step->step_label,
                    'title' => $step->title,
                    'description' => $step->description,
                    'icon' => $step->icon,
                    'accent_class' => $step->accent_class,
                    'icon_bg_class' => $step->icon_bg_class,
                    'sort_order' => $step->sort_order,
                    'is_active' => (bool) $step->is_active,
                ]),

            'requirements' => PpdbRequirement::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbRequirement $requirement) => [
                    'id' => $requirement->id,
                    'title' => $requirement->title,
                    'description' => $requirement->description,
                    'is_required' => (bool) $requirement->is_required,
                    'is_active' => (bool) $requirement->is_active,
                    'sort_order' => $requirement->sort_order,
                ]),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'timelines' => ['nullable', 'array'],
            'timelines.*.id' => ['nullable', 'integer'],
            'timelines.*.title' => ['nullable', 'string', 'max:255'],
            'timelines.*.date_text' => ['nullable', 'string', 'max:255'],
            'timelines.*.icon' => ['nullable', 'string', 'max:50'],
            'timelines.*.sort_order' => ['nullable', 'integer'],
            'timelines.*.is_active' => ['nullable', 'boolean'],

            'steps' => ['nullable', 'array'],
            'steps.*.id' => ['nullable', 'integer'],
            'steps.*.number' => ['nullable', 'string', 'max:50'],
            'steps.*.step_label' => ['nullable', 'string', 'max:100'],
            'steps.*.title' => ['nullable', 'string', 'max:255'],
            'steps.*.description' => ['nullable', 'string'],
            'steps.*.icon' => ['nullable', 'string', 'max:50'],
            'steps.*.accent_class' => ['nullable', 'string', 'max:255'],
            'steps.*.icon_bg_class' => ['nullable', 'string', 'max:255'],
            'steps.*.sort_order' => ['nullable', 'integer'],
            'steps.*.is_active' => ['nullable', 'boolean'],

            'requirements' => ['nullable', 'array'],
            'requirements.*.id' => ['nullable', 'integer'],
            'requirements.*.title' => ['nullable', 'string', 'max:255'],
            'requirements.*.description' => ['nullable', 'string'],
            'requirements.*.is_required' => ['nullable', 'boolean'],
            'requirements.*.is_active' => ['nullable', 'boolean'],
            'requirements.*.sort_order' => ['nullable', 'integer'],
        ]);

        DB::transaction(function () use ($validated) {
            $this->syncTimelines($validated['timelines'] ?? []);
            $this->syncSteps($validated['steps'] ?? []);
            $this->syncRequirements($validated['requirements'] ?? []);
        });

        return redirect()
            ->route('admin.ppdb-panel.content.edit')
            ->with('success', 'Konten PPDB berhasil diperbarui.');
    }

    private function syncTimelines(array $items): void
    {
        $savedIds = [];

        foreach ($items as $index => $item) {
            $title = trim((string) ($item['title'] ?? ''));

            if ($title === '') {
                continue;
            }

            $timeline = PpdbTimeline::query()->updateOrCreate(
                ['id' => $item['id'] ?? null],
                [
                    'title' => $title,
                    'date_text' => $item['date_text'] ?? null,
                    'icon' => $item['icon'] ?? '🗓️',
                    'sort_order' => (int) ($item['sort_order'] ?? ($index + 1)),
                    'is_active' => (bool) ($item['is_active'] ?? false),
                ]
            );

            $savedIds[] = $timeline->id;
        }

        PpdbTimeline::query()
            ->when(count($savedIds) > 0, fn ($query) => $query->whereNotIn('id', $savedIds))
            ->delete();
    }

    private function syncSteps(array $items): void
    {
        $savedIds = [];

        foreach ($items as $index => $item) {
            $title = trim((string) ($item['title'] ?? ''));

            if ($title === '') {
                continue;
            }

            $step = PpdbStep::query()->updateOrCreate(
                ['id' => $item['id'] ?? null],
                [
                    'number' => $item['number'] ?? str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT),
                    'step_label' => $item['step_label'] ?? 'Tahap ' . ($index + 1),
                    'title' => $title,
                    'description' => $item['description'] ?? null,
                    'icon' => $item['icon'] ?? '📝',
                    'accent_class' => $item['accent_class'] ?? 'border-b-[#d5a542]',
                    'icon_bg_class' => $item['icon_bg_class'] ?? 'bg-[#faf5e8]',
                    'sort_order' => (int) ($item['sort_order'] ?? ($index + 1)),
                    'is_active' => (bool) ($item['is_active'] ?? false),
                ]
            );

            $savedIds[] = $step->id;
        }

        PpdbStep::query()
            ->when(count($savedIds) > 0, fn ($query) => $query->whereNotIn('id', $savedIds))
            ->delete();
    }

    private function syncRequirements(array $items): void
    {
        $savedIds = [];

        foreach ($items as $index => $item) {
            $title = trim((string) ($item['title'] ?? ''));

            if ($title === '') {
                continue;
            }

            $requirement = PpdbRequirement::query()->updateOrCreate(
                ['id' => $item['id'] ?? null],
                [
                    'title' => $title,
                    'description' => $item['description'] ?? null,
                    'is_required' => (bool) ($item['is_required'] ?? false),
                    'is_active' => (bool) ($item['is_active'] ?? false),
                    'sort_order' => (int) ($item['sort_order'] ?? ($index + 1)),
                ]
            );

            $savedIds[] = $requirement->id;
        }

        PpdbRequirement::query()
            ->when(count($savedIds) > 0, fn ($query) => $query->whereNotIn('id', $savedIds))
            ->delete();
    }
}
