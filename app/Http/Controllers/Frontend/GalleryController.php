<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('event_date')
            ->orderByDesc('id')
            ->get()
            ->map(function (Gallery $gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'category' => $gallery->category,
                    'description' => $gallery->description,
                    'image_url' => $gallery->image_url,
                    'event_date' => $gallery->event_date?->format('d M Y'),
                    'is_featured' => $gallery->is_featured,
                    'sort_order' => $gallery->sort_order,
                ];
            });

        $categories = $galleries
            ->pluck('category')
            ->filter()
            ->unique()
            ->values();

        return Inertia::render('Frontend/Gallery', [
            'galleries' => $galleries,
            'categories' => $categories,
        ]);
    }
}