<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        $profile = SchoolProfile::query()->first();

        if (! $profile) {
            $profile = SchoolProfile::query()->create([
                'school_name' => 'SMA Negeri 1 Sumenep',
                'short_name' => 'SMA Negeri 1',
                'city' => 'Sumenep',
                'tagline' => 'Berprestasi, Berkarakter, Berbudaya',
                'description' => 'SMA Negeri 1 Cerdas merupakan sekolah menengah atas yang berkomitmen membentuk peserta didik yang unggul dalam akademik, berkarakter, kreatif, berbudaya, serta siap bersaing di era global.',
            ]);
        }

        return Inertia::render('Admin/Profiles/Edit', [
            'profile' => $this->profilePayload($profile),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $profile = SchoolProfile::query()->first();

        if (! $profile) {
            $profile = new SchoolProfile();
        }

        $validated = $request->validate([
            'school_name' => ['required', 'string', 'max:255'],
            'short_name' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'principal_name' => ['nullable', 'string', 'max:255'],
            'principal_position' => ['nullable', 'string', 'max:255'],
            'principal_message' => ['nullable', 'string'],

            'history' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],

            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'vision_hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'structure_hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'history_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'identity_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'vision_banner_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'principal_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'missions' => ['nullable', 'array'],
            'missions.*' => ['nullable', 'string'],

            'identity' => ['nullable', 'array'],
            'identity.*.label' => ['nullable', 'string', 'max:255'],
            'identity.*.value' => ['nullable', 'string'],

            'values' => ['nullable', 'array'],
            'values.*.title' => ['nullable', 'string', 'max:255'],
            'values.*.icon' => ['nullable', 'string', 'max:255'],
            'values.*.description' => ['nullable', 'string'],

            'profile_stats' => ['nullable', 'array'],
            'profile_stats.*.value' => ['nullable', 'string', 'max:255'],
            'profile_stats.*.label' => ['nullable', 'string', 'max:255'],
            'profile_stats.*.icon' => ['nullable', 'string', 'max:255'],

            'hero_stats' => ['nullable', 'array'],
            'hero_stats.*.value' => ['nullable', 'string', 'max:255'],
            'hero_stats.*.label' => ['nullable', 'string', 'max:255'],
            'hero_stats.*.icon' => ['nullable', 'string', 'max:255'],

            'history_timeline' => ['nullable', 'array'],
            'history_timeline.*.year' => ['nullable', 'string', 'max:255'],
            'history_timeline.*.title' => ['nullable', 'string', 'max:255'],
            'history_timeline.*.description' => ['nullable', 'string'],
            'history_timeline.*.active' => ['nullable'],

            'vision_mission_items' => ['nullable', 'array'],
            'vision_mission_items.*.title' => ['nullable', 'string', 'max:255'],
            'vision_mission_items.*.description' => ['nullable', 'string'],
            'vision_mission_items.*.icon' => ['nullable', 'string', 'max:255'],

            'core_values' => ['nullable', 'array'],
            'core_values.*.title' => ['nullable', 'string', 'max:255'],
            'core_values.*.description' => ['nullable', 'string'],
            'core_values.*.icon' => ['nullable', 'string', 'max:255'],

            'vision_action_steps' => ['nullable', 'array'],
            'vision_action_steps.*.title' => ['nullable', 'string', 'max:255'],
            'vision_action_steps.*.description' => ['nullable', 'string'],
            'vision_action_steps.*.icon' => ['nullable', 'string', 'max:255'],
            'vision_action_steps.*.active' => ['nullable'],
            'vision_action_steps.*.gold' => ['nullable'],
        ]);

        $profileData = [
            'school_name' => $validated['school_name'],
            'short_name' => $validated['short_name'] ?? null,
            'city' => $validated['city'] ?? null,
            'tagline' => $validated['tagline'] ?? null,
            'description' => $validated['description'] ?? null,

            'principal_name' => $validated['principal_name'] ?? null,
            'principal_position' => $validated['principal_position'] ?? null,
            'principal_message' => $validated['principal_message'] ?? null,

            'history' => $validated['history'] ?? null,
            'vision' => $validated['vision'] ?? null,

            'missions' => $this->cleanStringArray($validated['missions'] ?? []),
            'identity' => $this->cleanKeyValueArray($validated['identity'] ?? []),
            'values' => $this->cleanCardArray($validated['values'] ?? [], ['title', 'icon', 'description']),
            'profile_stats' => $this->cleanCardArray($validated['profile_stats'] ?? [], ['value', 'label', 'icon']),
            'hero_stats' => $this->cleanCardArray($validated['hero_stats'] ?? [], ['value', 'label', 'icon']),
            'history_timeline' => $this->cleanTimelineArray($validated['history_timeline'] ?? []),
            'vision_mission_items' => $this->cleanCardArray($validated['vision_mission_items'] ?? [], ['title', 'description', 'icon']),
            'core_values' => $this->cleanCardArray($validated['core_values'] ?? [], ['title', 'description', 'icon']),
            'vision_action_steps' => $this->cleanActionSteps($validated['vision_action_steps'] ?? []),
        ];

        $imageFields = [
            'hero_image',
            'vision_hero_image',
            'structure_hero_image',
            'history_image',
            'identity_image',
            'vision_banner_image',
            'principal_image',
        ];

        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                if ($profile->{$field} && Storage::disk('public')->exists($profile->{$field})) {
                    Storage::disk('public')->delete($profile->{$field});
                }

                $profileData[$field] = $request->file($field)->store('profile', 'public');
            }
        }

        $profile->fill($profileData);
        $profile->save();

        return redirect()
            ->route('admin.profiles.edit')
            ->with('success', 'Profil sekolah berhasil diperbarui.');
    }

    private function profilePayload(SchoolProfile $profile): array
    {
        return [
            'id' => $profile->id,

            'school_name' => $profile->school_name,
            'short_name' => $profile->short_name,
            'city' => $profile->city,
            'tagline' => $profile->tagline,
            'description' => $profile->description,

            'hero_image_url' => $profile->hero_image_url,
            'vision_hero_image_url' => $profile->vision_hero_image_url,
            'structure_hero_image_url' => $profile->structure_hero_image_url,
            'history_image_url' => $profile->history_image_url,
            'identity_image_url' => $profile->identity_image_url,
            'vision_banner_image_url' => $profile->vision_banner_image_url,

            'principal_name' => $profile->principal_name,
            'principal_position' => $profile->principal_position,
            'principal_image_url' => $profile->principal_image_url,
            'principal_message' => $profile->principal_message,

            'history' => $profile->history,
            'vision' => $profile->vision,

            'missions' => $profile->missions ?? [],
            'identity' => $profile->identity ?? [],
            'values' => $profile->values ?? [],
            'profile_stats' => $profile->profile_stats ?? [],
            'hero_stats' => $profile->hero_stats ?? [],
            'history_timeline' => $profile->history_timeline ?? [],
            'vision_mission_items' => $profile->vision_mission_items ?? [],
            'core_values' => $profile->core_values ?? [],
            'vision_action_steps' => $profile->vision_action_steps ?? [],
        ];
    }

    private function cleanStringArray(array $items): array
    {
        return collect($items)
            ->map(fn ($item) => is_string($item) ? trim($item) : null)
            ->filter()
            ->values()
            ->all();
    }

    private function cleanKeyValueArray(array $items): array
    {
        return collect($items)
            ->map(function ($item) {
                return [
                    'label' => trim($item['label'] ?? ''),
                    'value' => trim($item['value'] ?? ''),
                ];
            })
            ->filter(fn ($item) => $item['label'] !== '' || $item['value'] !== '')
            ->values()
            ->all();
    }

    private function cleanCardArray(array $items, array $keys): array
    {
        return collect($items)
            ->map(function ($item) use ($keys) {
                $row = [];

                foreach ($keys as $key) {
                    $row[$key] = trim($item[$key] ?? '');
                }

                return $row;
            })
            ->filter(function ($item) use ($keys) {
                foreach ($keys as $key) {
                    if (($item[$key] ?? '') !== '') {
                        return true;
                    }
                }

                return false;
            })
            ->values()
            ->all();
    }

    private function cleanTimelineArray(array $items): array
    {
        return collect($items)
            ->map(function ($item) {
                return [
                    'year' => trim($item['year'] ?? ''),
                    'title' => trim($item['title'] ?? ''),
                    'description' => trim($item['description'] ?? ''),
                    'active' => filter_var($item['active'] ?? false, FILTER_VALIDATE_BOOLEAN),
                ];
            })
            ->filter(fn ($item) => $item['year'] !== '' || $item['title'] !== '' || $item['description'] !== '')
            ->values()
            ->all();
    }

    private function cleanActionSteps(array $items): array
    {
        return collect($items)
            ->map(function ($item) {
                return [
                    'title' => trim($item['title'] ?? ''),
                    'description' => trim($item['description'] ?? ''),
                    'icon' => trim($item['icon'] ?? ''),
                    'active' => filter_var($item['active'] ?? false, FILTER_VALIDATE_BOOLEAN),
                    'gold' => filter_var($item['gold'] ?? false, FILTER_VALIDATE_BOOLEAN),
                ];
            })
            ->filter(fn ($item) => $item['title'] !== '' || $item['description'] !== '' || $item['icon'] !== '')
            ->values()
            ->all();
    }
}