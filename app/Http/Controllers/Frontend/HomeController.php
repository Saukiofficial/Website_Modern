<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\HomeSection;
use App\Models\Post;
use App\Models\PpdbSetting;
use App\Models\SchoolStatistic;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $homeSection = HomeSection::query()->first();

        $statistics = SchoolStatistic::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function (SchoolStatistic $statistic) {
                return [
                    'id' => $statistic->id,
                    'title' => $statistic->title,
                    'value' => $statistic->value,
                    'desc' => $statistic->description,
                    'icon' => $statistic->icon,
                ];
            });

        $latestNews = Post::query()
            ->where('is_published', true)
            ->where(function ($query) {
                $query
                    ->whereNull('category')
                    ->orWhereRaw('LOWER(category) != ?', ['pengumuman']);
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->limit(3)
            ->get()
            ->map(function (Post $post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'category' => $post->category,
                    'excerpt' => $post->excerpt,
                    'date' => $post->published_at
                        ? $post->published_at->format('d M Y')
                        : $post->created_at?->format('d M Y'),
                    'image' => $post->thumbnail_url,
                    'url' => route('informasi.show', $post->slug),
                ];
            });

        $announcements = Post::query()
            ->where('is_published', true)
            ->whereRaw('LOWER(category) = ?', ['pengumuman'])
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->limit(3)
            ->get()
            ->map(function (Post $post) {
                $date = $post->published_at ?: $post->created_at;

                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'day' => $date?->format('d') ?: '-',
                    'month' => strtoupper($date?->format('M') ?: '-'),
                    'date' => $date?->format('d M Y'),
                    'url' => route('informasi.show', $post->slug),
                ];
            });

        $galleryItems = Gallery::query()
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('event_date')
            ->orderByDesc('id')
            ->limit(4)
            ->get()
            ->map(function (Gallery $gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'category' => $gallery->category,
                    'image' => $gallery->image_url,
                    'event_date' => $gallery->event_date?->format('d M Y'),
                ];
            });

        $ppdbSetting = PpdbSetting::query()->first();

        return Inertia::render('Frontend/Home', [
            'homeSection' => $homeSection ? [
                'hero_title' => $homeSection->hero_title,
                'hero_subtitle' => $homeSection->hero_subtitle,
                'hero_button_text' => $homeSection->hero_button_text,
                'hero_button_url' => $homeSection->hero_button_url,
                'hero_background_url' => $homeSection->hero_background_url,
                'hero_image_url' => $homeSection->hero_image_url,
                'ppdb_title' => $homeSection->ppdb_title,
                'ppdb_description' => $homeSection->ppdb_description,
                'ppdb_button_text' => $homeSection->ppdb_button_text,
                'ppdb_button_url' => $homeSection->ppdb_button_url,
            ] : null,

            'statistics' => $statistics,
            'latestNews' => $latestNews,
            'galleryItems' => $galleryItems,
            'announcements' => $announcements,

            'ppdbSetting' => $ppdbSetting ? [
                'academic_year' => $ppdbSetting->academic_year,
                'is_open' => $ppdbSetting->is_open,
                'cta_label' => $ppdbSetting->cta_label,
                'cta_url' => $ppdbSetting->cta_url,
            ] : null,
        ]);
    }
}