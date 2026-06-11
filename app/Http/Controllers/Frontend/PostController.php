<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(function (Post $post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'category' => $post->category,
                    'excerpt' => $post->excerpt,
                    'content' => $post->content,
                    'thumbnail_url' => $post->thumbnail_url,
                    'author' => $post->author,
                    'published_at' => $post->published_at?->format('d M Y'),
                    'is_featured' => $post->is_featured,
                ];
            });

        return Inertia::render('Frontend/Informasi', [
            'posts' => $posts->values(),
            'featuredPosts' => $posts->where('is_featured', true)->values()->take(3),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedPosts = Post::query()
            ->where('is_published', true)
            ->where('id', '!=', $post->id)
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(function (Post $item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'category' => $item->category,
                    'excerpt' => $item->excerpt,
                    'thumbnail_url' => $item->thumbnail_url,
                    'published_at' => $item->published_at?->format('d M Y'),
                ];
            });

        return Inertia::render('Frontend/InformasiDetail', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'thumbnail_url' => $post->thumbnail_url,
                'author' => $post->author,
                'published_at' => $post->published_at?->format('d M Y'),
            ],
            'relatedPosts' => $relatedPosts,
        ]);
    }
}