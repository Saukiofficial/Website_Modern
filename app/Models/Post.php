<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'thumbnail',
        'author',
        'published_at',
        'is_featured',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'published_at' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected $appends = [
        'thumbnail_url',
    ];

    public function getThumbnailUrlAttribute(): ?string
    {
        if (! $this->thumbnail) {
            return null;
        }

        if (str_starts_with($this->thumbnail, 'http')) {
            return $this->thumbnail;
        }

        if (str_starts_with($this->thumbnail, '/')) {
            return $this->thumbnail;
        }

        return Storage::url($this->thumbnail);
    }

    public function getPublishStatusLabelAttribute(): string
    {
        return $this->is_published ? 'Published' : 'Draft';
    }
}