<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('event_date')
            ->orderByDesc('id')
            ->get()
            ->map(function (Gallery $gallery) {
                return $this->galleryPayload($gallery);
            });

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateGallery($request);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('image')) {
            $payload['image'] = $request
                ->file('image')
                ->store('galleries', 'public');
        }

        Gallery::query()->create($payload);

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $this->galleryPayload($gallery),
        ]);
    }

    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $this->validateGallery($request, $gallery);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('image')) {
            if (
                $gallery->image &&
                Storage::disk('public')->exists($gallery->image)
            ) {
                Storage::disk('public')->delete($gallery->image);
            }

            $payload['image'] = $request
                ->file('image')
                ->store('galleries', 'public');
        }

        $gallery->update($payload);

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        if (
            $gallery->image &&
            Storage::disk('public')->exists($gallery->image)
        ) {
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Galeri berhasil dihapus.');
    }

    private function validateGallery(Request $request, ?Gallery $gallery = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => [
                $gallery ? 'nullable' : 'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],
            'event_date' => ['nullable', 'date'],
            'is_featured' => ['nullable'],
            'is_active' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ], [
            'title.required' => 'Judul galeri wajib diisi.',
            'image.required' => 'Gambar galeri wajib diupload.',
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Format gambar harus jpg, jpeg, png, atau webp.',
            'image.max' => 'Ukuran gambar maksimal 4MB.',
        ]);
    }

    private function buildPayload(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'] ?? null,
            'event_date' => $validated['event_date'] ?? null,
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'sort_order' => $validated['sort_order'] ?? 0,
        ];
    }

    private function galleryPayload(Gallery $gallery): array
    {
        return [
            'id' => $gallery->id,
            'title' => $gallery->title,
            'category' => $gallery->category,
            'description' => $gallery->description,
            'image' => $gallery->image,
            'image_url' => $gallery->image_url,
            'event_date' => $gallery->event_date?->format('Y-m-d'),
            'event_date_label' => $gallery->event_date?->format('d M Y'),
            'is_featured' => $gallery->is_featured,
            'is_active' => $gallery->is_active,
            'sort_order' => $gallery->sort_order,
        ];
    }
}