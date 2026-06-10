<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'name',
        'position',
        'subject',
        'education',
        'description',
        'image',
        'email',
        'phone',
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