<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicResource extends Model
{
    protected $fillable = [
        'title',
        'type',
        'file_path',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getFileUrlAttribute(): ?string
    {
        if (! $this->file_path) {
            return null;
        }

        if (str_starts_with($this->file_path, 'http') || str_starts_with($this->file_path, '/')) {
            return $this->file_path;
        }

        return asset('storage/' . $this->file_path);
    }
}