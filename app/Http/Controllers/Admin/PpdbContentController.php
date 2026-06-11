<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbRequirement;
use App\Models\PpdbStep;
use App\Models\PpdbTimeline;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PpdbContentController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/PpdbContents/Edit', [
            'timelines' => PpdbTimeline::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbTimeline $item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'date_text' => $item->date_text,
                    'icon' => $item->icon,
                    'sort_order' => $item->sort_order,
                    'is_active' => $item->is_active,
                ]),

            'steps' => PpdbStep::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbStep $item) => [
                    'id' => $item->id,
                    'number' => $item->number,
                    'step_label' => $item->step_label,
                    'title' => $item->title,
                    'description' => $item->description,
                    'icon' => $item->icon,
                    'accent_class' => $item->accent_class,
                    'icon_bg_class' => $item->icon_bg_class,
                    'sort_order' => $item->sort_order,
                    'is_active' => $item->is_active,
                ]),

            'requirements' => PpdbRequirement::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
                ->map(fn (PpdbRequirement $item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'is_required' => $item->is_required,
                    'is_active' => $item->is_active,
                    'sort_order' => $item->sort_order,
                ]),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'timelines' => ['nullable', 'array'],
            'timelines.*.id' => ['nullable', 'integer'],
            'timelines.*.title' => ['required', 'string', 'max:255'],
            'timelines.*.date_text' => ['nullable', 'string', 'max:255'],
            'timelines.*.icon' => ['nullable', 'string', 'max:50'],
            'timelines.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'timelines.*.is_active' => ['nullable'],

            'steps' => ['nullable', 'array'],
            'steps.*.id' => ['nullable', 'integer'],
            'steps.*.number' => ['nullable', 'string', 'max:50'],
            'steps.*.step_label' => ['nullable', 'string', 'max:255'],
            'steps.*.title' => ['required', 'string', 'max:255'],
            'steps.*.description' => ['nullable', 'string'],
            'steps.*.icon' => ['nullable', 'string', 'max:50'],
            'steps.*.accent_class' => ['nullable', 'string', 'max:255'],
            'steps.*.icon_bg_class' => ['nullable', 'string', 'max:255'],
            'steps.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'steps.*.is_active' => ['nullable'],

            'requirements' => ['nullable', 'array'],
            'requirements.*.id' => ['nullable', 'integer'],
            'requirements.*.title' => ['required', 'string', 'max:255'],
            'requirements.*.description' => ['nullable', 'string'],
            'requirements.*.is_required' => ['nullable'],
            'requirements.*.is_active' => ['nullable'],
            'requirements.*.sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $this->syncTimelines($validated['timelines'] ?? []);
        $this->syncSteps($validated['steps'] ?? []);
        $this->syncRequirements($validated['requirements'] ?? []);

        return redirect()
            ->route('admin.ppdb-content.edit')
            ->with('success', 'Konten PPDB berhasil diperbarui.');
    }

    private function syncTimelines(array $items): void
    {
        $ids = [];

        foreach ($items as $index => $item) {
            $payload = [
                'title' => $item['title'],
                'date_text' => $item['date_text'] ?? null,
                'icon' => $item['icon'] ?? null,
                'sort_order' => $item['sort_order'] ?? ($index + 1),
                'is_active' => filter_var($item['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ];

            if (! empty($item['id'])) {
                $model = PpdbTimeline::query()->find($item['id']);

                if ($model) {
                    $model->update($payload);
                    $ids[] = $model->id;
                }
            } else {
                $model = PpdbTimeline::query()->create($payload);
                $ids[] = $model->id;
            }
        }

        PpdbTimeline::query()
            ->whereNotIn('id', $ids)
            ->delete();
    }

    private function syncSteps(array $items): void
    {
        $ids = [];

        foreach ($items as $index => $item) {
            $payload = [
                'number' => $item['number'] ?? str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT),
                'step_label' => $item['step_label'] ?? null,
                'title' => $item['title'],
                'description' => $item['description'] ?? null,
                'icon' => $item['icon'] ?? null,
                'accent_class' => $item['accent_class'] ?? 'border-b-[#d5a542]',
                'icon_bg_class' => $item['icon_bg_class'] ?? 'bg-[#faf5e8]',
                'sort_order' => $item['sort_order'] ?? ($index + 1),
                'is_active' => filter_var($item['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ];

            if (! empty($item['id'])) {
                $model = PpdbStep::query()->find($item['id']);

                if ($model) {
                    $model->update($payload);
                    $ids[] = $model->id;
                }
            } else {
                $model = PpdbStep::query()->create($payload);
                $ids[] = $model->id;
            }
        }

        PpdbStep::query()
            ->whereNotIn('id', $ids)
            ->delete();
    }

    private function syncRequirements(array $items): void
    {
        $ids = [];

        foreach ($items as $index => $item) {
            $payload = [
                'title' => $item['title'],
                'description' => $item['description'] ?? null,
                'is_required' => filter_var($item['is_required'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'is_active' => filter_var($item['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'sort_order' => $item['sort_order'] ?? ($index + 1),
            ];

            if (! empty($item['id'])) {
                $model = PpdbRequirement::query()->find($item['id']);

                if ($model) {
                    $model->update($payload);
                    $ids[] = $model->id;
                }
            } else {
                $model = PpdbRequirement::query()->create($payload);
                $ids[] = $model->id;
            }
        }

        PpdbRequirement::query()
            ->whereNotIn('id', $ids)
            ->delete();
    }
}