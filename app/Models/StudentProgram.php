<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class StudentProgram extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'eyebrow',
        'hero_title',
        'description',
        'hero_image',
        'icon',
        'form_title',
        'form_description',
        'interest_label',
        'interest_options',
        'reason_label',
        'reason_placeholder',
        'points',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'interest_options' => 'array',
        'points' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'hero_image_url',
    ];

    public function getHeroImageUrlAttribute(): ?string
    {
        if (! $this->hero_image) {
            return null;
        }

        if (str_starts_with($this->hero_image, 'http')) {
            return $this->hero_image;
        }

        if (str_starts_with($this->hero_image, '/')) {
            return $this->hero_image;
        }

        return Storage::url($this->hero_image);
    }
}