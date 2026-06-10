<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OsisMember extends Model
{
    protected $fillable = [
        'name',
        'position',
        'class_name',
        'description',
        'image',
        'period',
        'sort_order',
        'is_leader',
        'is_active',
    ];

    protected $casts = [
        'is_leader' => 'boolean',
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