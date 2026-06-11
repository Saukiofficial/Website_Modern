<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PpdbSetting extends Model
{
    protected $fillable = [
        'academic_year',
        'eyebrow',
        'hero_title',
        'hero_description',
        'hero_image',
        'section_title',
        'section_description',
        'requirement_title',
        'requirement_description',
        'cta_label',
        'cta_url',
        'is_open',
        'closed_message',
    ];

    protected $casts = [
        'is_open' => 'boolean',
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