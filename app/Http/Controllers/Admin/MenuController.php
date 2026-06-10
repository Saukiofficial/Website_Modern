<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $menus = Menu::query()
            ->with('parent')
            ->orderByRaw('parent_id IS NOT NULL')
            ->orderBy('parent_id')
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get()
            ->map(function (Menu $menu) {
                return [
                    'id' => $menu->id,
                    'label' => $menu->label,
                    'url' => $menu->url,
                    'parent_id' => $menu->parent_id,
                    'parent_label' => $menu->parent?->label,
                    'sort_order' => $menu->sort_order,
                    'is_active' => $menu->is_active,
                    'created_at' => $menu->created_at?->format('d M Y'),
                ];
            });

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Menus/Create', [
            'parentMenus' => $this->getParentMenus(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:menus,id'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($validated['parent_id'] === '') {
            $validated['parent_id'] = null;
        }

        Menu::query()->create($validated);

        return redirect()
            ->route('admin.menus.index')
            ->with('success', 'Menu navbar berhasil ditambahkan.');
    }

    public function edit(Menu $menu): Response
    {
        return Inertia::render('Admin/Menus/Edit', [
            'menu' => [
                'id' => $menu->id,
                'label' => $menu->label,
                'url' => $menu->url,
                'parent_id' => $menu->parent_id,
                'sort_order' => $menu->sort_order,
                'is_active' => $menu->is_active,
            ],
            'parentMenus' => $this->getParentMenus($menu->id),
        ]);
    }

    public function update(Request $request, Menu $menu): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:menus,id'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        if ($validated['parent_id'] === '') {
            $validated['parent_id'] = null;
        }

        if ((int) $validated['parent_id'] === (int) $menu->id) {
            return back()
                ->withErrors([
                    'parent_id' => 'Menu tidak boleh menjadi parent untuk dirinya sendiri.',
                ])
                ->withInput();
        }

        $menu->update($validated);

        return redirect()
            ->route('admin.menus.index')
            ->with('success', 'Menu navbar berhasil diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        $menu->children()->update([
            'parent_id' => null,
        ]);

        $menu->delete();

        return redirect()
            ->route('admin.menus.index')
            ->with('success', 'Menu navbar berhasil dihapus.');
    }

    private function getParentMenus(?int $exceptId = null)
    {
        return Menu::query()
            ->whereNull('parent_id')
            ->when($exceptId, function ($query) use ($exceptId) {
                $query->where('id', '!=', $exceptId);
            })
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get()
            ->map(function (Menu $menu) {
                return [
                    'id' => $menu->id,
                    'label' => $menu->label,
                ];
            });
    }
}