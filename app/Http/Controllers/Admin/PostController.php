<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(function (Post $post) {
                return $this->postPayload($post);
            });

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatePost($request);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('thumbnail')) {
            $payload['thumbnail'] = $request
                ->file('thumbnail')
                ->store('posts', 'public');
        }

        Post::query()->create($payload);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Informasi berhasil ditambahkan.');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $this->postPayload($post),
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $this->validatePost($request, $post);

        $payload = $this->buildPayload($validated);

        if ($request->hasFile('thumbnail')) {
            if (
                $post->thumbnail &&
                Storage::disk('public')->exists($post->thumbnail)
            ) {
                Storage::disk('public')->delete($post->thumbnail);
            }

            $payload['thumbnail'] = $request
                ->file('thumbnail')
                ->store('posts', 'public');
        }

        $post->update($payload);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Informasi berhasil diperbarui.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        if (
            $post->thumbnail &&
            Storage::disk('public')->exists($post->thumbnail)
        ) {
            Storage::disk('public')->delete($post->thumbnail);
        }

        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Informasi berhasil dihapus.');
    }

    private function validatePost(Request $request, ?Post $post = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('posts', 'slug')->ignore($post?->id),
            ],
            'category' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'author' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['nullable'],
            'is_published' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    private function buildPayload(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'slug' => $validated['slug'] ?: Str::slug($validated['title']),
            'category' => $validated['category'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'author' => $validated['author'] ?? 'Admin Sekolah',
            'published_at' => $validated['published_at'] ?? now()->toDateString(),
            'is_featured' => filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'is_published' => filter_var($validated['is_published'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'sort_order' => $validated['sort_order'] ?? 0,
        ];
    }

    private function postPayload(Post $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'category' => $post->category,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'thumbnail' => $post->thumbnail,
            'thumbnail_url' => $post->thumbnail_url,
            'author' => $post->author,
            'published_at' => $post->published_at?->format('Y-m-d'),
            'published_at_label' => $post->published_at?->format('d M Y'),
            'is_featured' => $post->is_featured,
            'is_published' => $post->is_published,
            'publish_status_label' => $post->publish_status_label,
            'sort_order' => $post->sort_order,
        ];
    }
}