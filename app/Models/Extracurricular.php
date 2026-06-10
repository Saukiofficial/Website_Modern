<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extracurricular extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'coach_name',
        'description',
        'schedule',
        'location',
        'icon',
        'image',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        if (str_starts_with($this->image, 'http') || str_starts_with($this->image, '/')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }
}