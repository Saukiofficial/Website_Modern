<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_button_text',
        'hero_button_url',
        'hero_background',
        'hero_image',
        'ppdb_title',
        'ppdb_description',
        'ppdb_button_text',
        'ppdb_button_url',
    ];

    public function getHeroBackgroundUrlAttribute(): ?string
    {
        if (!$this->hero_background) {
            return null;
        }

        if (str_starts_with($this->hero_background, 'http')) {
            return $this->hero_background;
        }

        return asset('storage/' . $this->hero_background);
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        if (!$this->hero_image) {
            return null;
        }

        if (str_starts_with($this->hero_image, 'http')) {
            return $this->hero_image;
        }

        return asset('storage/' . $this->hero_image);
    }
}