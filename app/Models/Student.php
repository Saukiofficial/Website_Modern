<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_number',
        'nisn',
        'name',
        'gender',
        'class_level',
        'class_name',
        'academic_year',
        'student_status',
        'graduation_year',
        'birth_place',
        'birth_date',
        'religion',
        'address',
        'phone',
        'email',
        'father_name',
        'mother_name',
        'photo',
        'voting_token',
        'is_active',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'graduation_year' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'photo_url',
        'class_label',
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

    public function getClassLabelAttribute(): string
    {
        $level = $this->class_level ?: '-';
        $name = $this->class_name ?: '';

        return trim($level . ' ' . $name);
    }
}
