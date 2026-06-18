<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OsisMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OsisPanelMemberController extends Controller
{
    public function index(): Response
    {
        $osisMembers = OsisMember::query()
            ->orderByDesc('is_leader')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (OsisMember $member) => $this->memberPayload($member));

        return Inertia::render('Admin/OsisPanel/Members/Index', [
            'osisMembers' => $osisMembers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/OsisPanel/Members/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'period' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_leader' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'position' => $validated['position'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'period' => $validated['period'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_leader' => filter_var($validated['is_leader'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            $payload['image'] = $request->file('image')->store('academic/osis', 'public');
        }

        OsisMember::query()->create($payload);

        return redirect()
            ->route('admin.osis-panel.members.index')
            ->with('success', 'Data pengurus OSIS berhasil ditambahkan.');
    }

    public function edit(OsisMember $osisMember): Response
    {
        return Inertia::render('Admin/OsisPanel/Members/Edit', [
            'osisMember' => $this->memberPayload($osisMember),
        ]);
    }

    public function update(Request $request, OsisMember $osisMember): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'period' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_leader' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $payload = [
            'name' => $validated['name'],
            'position' => $validated['position'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'description' => $validated['description'] ?? null,
            'period' => $validated['period'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_leader' => filter_var($validated['is_leader'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('image')) {
            if ($osisMember->image && Storage::disk('public')->exists($osisMember->image)) {
                Storage::disk('public')->delete($osisMember->image);
            }

            $payload['image'] = $request->file('image')->store('academic/osis', 'public');
        }

        $osisMember->update($payload);

        return redirect()
            ->route('admin.osis-panel.members.index')
            ->with('success', 'Data pengurus OSIS berhasil diperbarui.');
    }

    public function destroy(OsisMember $osisMember): RedirectResponse
    {
        if ($osisMember->image && Storage::disk('public')->exists($osisMember->image)) {
            Storage::disk('public')->delete($osisMember->image);
        }

        $osisMember->delete();

        return redirect()
            ->route('admin.osis-panel.members.index')
            ->with('success', 'Data pengurus OSIS berhasil dihapus.');
    }

    private function memberPayload(OsisMember $member): array
    {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'position' => $member->position,
            'class_name' => $member->class_name,
            'description' => $member->description,
            'image' => $member->image,
            'image_url' => $member->image_url,
            'period' => $member->period,
            'sort_order' => $member->sort_order,
            'is_leader' => $member->is_leader,
            'is_active' => $member->is_active,
        ];
    }
}