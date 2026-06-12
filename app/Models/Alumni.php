<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Alumni extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_number',
        'nisn',
        'name',
        'gender',
        'graduation_year',
        'class_name',
        'birth_place',
        'birth_date',
        'phone',
        'email',
        'address',
        'current_activity',
        'institution',
        'job_position',
        'photo',
        'is_active',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'photo_url',
    ];

    public function getPhotoUrlAttribute(): ?string
    {
        if (! $this->photo) {
            return null;
        }

        if (str_starts_with($this->photo, 'http')) {
            return $this->photo;
        }

        return Storage::url($this->photo);
    }
}