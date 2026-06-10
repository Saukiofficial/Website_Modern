<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentAchievement extends Model
{
    protected $fillable = [
        'title',
        'student_name',
        'competition_name',
        'level',
        'rank',
        'year',
        'description',
        'image',
        'sort_order',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
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