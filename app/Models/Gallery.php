<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'image',
        'event_date',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        if (str_starts_with($this->image, '/')) {
            return $this->image;
        }

        return Storage::url($this->image);
    }
}