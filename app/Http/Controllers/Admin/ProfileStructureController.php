<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrganizationStructure;
use App\Models\OrganizationUnit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileStructureController extends Controller
{
    public function edit(): Response
    {
        $leaders = OrganizationStructure::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (OrganizationStructure $leader) {
                return [
                    'id' => $leader->id,
                    'role' => $leader->role,
                    'name' => $leader->name,
                    'description' => $leader->description,
                    'image' => null,
                    'image_url' => $leader->image_url,
                    'fallback_image' => $leader->fallback_image,
                    'sort_order' => $leader->sort_order,
                    'is_principal' => $leader->is_principal,
                    'is_active' => $leader->is_active,
                ];
            });

        $units = OrganizationUnit::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (OrganizationUnit $unit) {
                return [
                    'id' => $unit->id,
                    'title' => $unit->title,
                    'description' => $unit->description,
                    'icon' => $unit->icon,
                    'sort_order' => $unit->sort_order,
                    'is_active' => $unit->is_active,
                ];
            });

        return Inertia::render('Admin/Profiles/Structure', [
            'leaders' => $leaders,
            'units' => $units,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'leaders' => ['nullable', 'array'],
            'leaders.*.id' => ['nullable'],
            'leaders.*.role' => ['required_with:leaders', 'string', 'max:255'],
            'leaders.*.name' => ['required_with:leaders', 'string', 'max:255'],
            'leaders.*.description' => ['nullable', 'string'],
            'leaders.*.fallback_image' => ['nullable', 'string', 'max:1000'],
            'leaders.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'leaders.*.is_principal' => ['nullable'],
            'leaders.*.is_active' => ['nullable'],
            'leaders.*.image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'units' => ['nullable', 'array'],
            'units.*.id' => ['nullable'],
            'units.*.title' => ['required_with:units', 'string', 'max:255'],
            'units.*.description' => ['nullable', 'string'],
            'units.*.icon' => ['nullable', 'string', 'max:255'],
            'units.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'units.*.is_active' => ['nullable'],
        ]);

        $leaderIds = [];

        foreach ($validated['leaders'] ?? [] as $index => $leaderData) {
            $leader = ! empty($leaderData['id'])
                ? OrganizationStructure::query()->find($leaderData['id'])
                : new OrganizationStructure();

            if (! $leader) {
                $leader = new OrganizationStructure();
            }

            $payload = [
                'role' => $leaderData['role'],
                'name' => $leaderData['name'],
                'description' => $leaderData['description'] ?? null,
                'fallback_image' => $leaderData['fallback_image'] ?? null,
                'sort_order' => $leaderData['sort_order'] ?? $index + 1,
                'is_principal' => filter_var($leaderData['is_principal'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'is_active' => filter_var($leaderData['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ];

            if ($request->hasFile("leaders.$index.image")) {
                if ($leader->image && Storage::disk('public')->exists($leader->image)) {
                    Storage::disk('public')->delete($leader->image);
                }

                $payload['image'] = $request
                    ->file("leaders.$index.image")
                    ->store('profile/structure', 'public');
            }

            $leader->fill($payload);
            $leader->save();

            $leaderIds[] = $leader->id;
        }

        OrganizationStructure::query()
            ->whereNotIn('id', $leaderIds)
            ->get()
            ->each(function (OrganizationStructure $leader) {
                if ($leader->image && Storage::disk('public')->exists($leader->image)) {
                    Storage::disk('public')->delete($leader->image);
                }

                $leader->delete();
            });

        $unitIds = [];

        foreach ($validated['units'] ?? [] as $index => $unitData) {
            $unit = ! empty($unitData['id'])
                ? OrganizationUnit::query()->find($unitData['id'])
                : new OrganizationUnit();

            if (! $unit) {
                $unit = new OrganizationUnit();
            }

            $unit->fill([
                'title' => $unitData['title'],
                'description' => $unitData['description'] ?? null,
                'icon' => $unitData['icon'] ?? '📌',
                'sort_order' => $unitData['sort_order'] ?? $index + 1,
                'is_active' => filter_var($unitData['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ]);

            $unit->save();

            $unitIds[] = $unit->id;
        }

        OrganizationUnit::query()
            ->whereNotIn('id', $unitIds)
            ->delete();

        return redirect()
            ->route('admin.profiles.structure.edit')
            ->with('success', 'Struktur organisasi berhasil diperbarui.');
    }
}