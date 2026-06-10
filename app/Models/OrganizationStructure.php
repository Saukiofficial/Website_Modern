<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganizationStructure extends Model
{
    protected $fillable = [
        'role',
        'name',
        'description',
        'image',
        'fallback_image',
        'sort_order',
        'is_principal',
        'is_active',
    ];

    protected $casts = [
        'is_principal' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return $this->fallback_image;
        }

        if (str_starts_with($this->image, 'http') || str_starts_with($this->image, '/')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }
}