<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use App\Models\SchoolSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Root template yang digunakan oleh Inertia.
     */
    protected $rootView = 'app';

    /**
     * Menentukan versi asset saat ini.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Data global yang dikirim ke semua halaman Inertia.
     */
    public function share(Request $request): array
    {
        $schoolSetting = SchoolSetting::query()->first();

        $menus = Menu::query()
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->with([
                'children' => function ($query) {
                    $query
                        ->where('is_active', true)
                        ->orderBy('sort_order');
                },
            ])
            ->orderBy('sort_order')
            ->get()
            ->map(function (Menu $menu) {
                return [
                    'id' => $menu->id,
                    'label' => $menu->label,
                    'url' => $menu->url,
                    'children' => $menu->children->map(function (Menu $child) {
                        return [
                            'id' => $child->id,
                            'label' => $child->label,
                            'url' => $child->url,
                        ];
                    })->values(),
                ];
            })
            ->values();

        return [
            ...parent::share($request),

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],

            'schoolSetting' => $schoolSetting ? [
                'school_name' => $schoolSetting->school_name,
                'tagline' => $schoolSetting->tagline,
                'logo_url' => $schoolSetting->logo_url,
                'phone' => $schoolSetting->phone,
                'email' => $schoolSetting->email,
                'address' => $schoolSetting->address,
                'facebook_url' => $schoolSetting->facebook_url,
                'instagram_url' => $schoolSetting->instagram_url,
                'youtube_url' => $schoolSetting->youtube_url,
            ] : [
                'school_name' => 'SMA Negeri 1 Sumenep',
                'tagline' => 'Sekolah Berprestasi',
                'logo_url' => null,
                'phone' => null,
                'email' => null,
                'address' => null,
                'facebook_url' => null,
                'instagram_url' => null,
                'youtube_url' => null,
            ],

            'frontendMenus' => $menus,
        ];
    }
}