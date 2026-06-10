<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SchoolSettingController extends Controller
{
    public function edit(): Response
    {
        $setting = SchoolSetting::query()->first();

        if (! $setting) {
            $setting = SchoolSetting::query()->create([
                'school_name' => 'SMA Negeri 1 Mojokerto',
                'tagline' => 'Sekolah Berprestasi, Berkarakter, dan Berdaya Saing Global',
                'logo' => null,
                'phone' => null,
                'email' => null,
                'address' => null,
                'facebook_url' => null,
                'instagram_url' => null,
                'youtube_url' => null,
            ]);
        }

        return Inertia::render('Admin/Settings/Edit', [
            'setting' => [
                'id' => $setting->id,
                'school_name' => $setting->school_name,
                'tagline' => $setting->tagline,
                'logo' => $setting->logo,
                'logo_url' => $setting->logo_url,
                'phone' => $setting->phone,
                'email' => $setting->email,
                'address' => $setting->address,
                'facebook_url' => $setting->facebook_url,
                'instagram_url' => $setting->instagram_url,
                'youtube_url' => $setting->youtube_url,
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $setting = SchoolSetting::query()->first();

        if (! $setting) {
            $setting = new SchoolSetting();
        }

        $validated = $request->validate([
            'school_name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'facebook_url' => ['nullable', 'string', 'max:255'],
            'instagram_url' => ['nullable', 'string', 'max:255'],
            'youtube_url' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('logo')) {
            if ($setting->logo && Storage::disk('public')->exists($setting->logo)) {
                Storage::disk('public')->delete($setting->logo);
            }

            $validated['logo'] = $request->file('logo')->store('school/logo', 'public');
        } else {
            unset($validated['logo']);
        }

        $setting->fill($validated);
        $setting->save();

        return redirect()
            ->route('admin.settings.edit')
            ->with('success', 'Setting sekolah berhasil diperbarui.');
    }
}