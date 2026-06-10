<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicPage extends Model
{
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_image',
        'calendar_title',
        'calendar_description',
        'teacher_title',
        'teacher_description',
        'extracurricular_title',
        'extracurricular_description',
        'osis_title',
        'osis_description',
        'achievement_title',
        'achievement_description',
    ];

    public function getHeroImageUrlAttribute(): ?string
    {
        if (! $this->hero_image) {
            return null;
        }

        if (str_starts_with($this->hero_image, 'http') || str_starts_with($this->hero_image, '/')) {
            return $this->hero_image;
        }

        return asset('storage/' . $this->hero_image);
    }
}