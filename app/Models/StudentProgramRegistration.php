<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProgramRegistration extends Model
{
    protected $fillable = [
        'registration_type',
        'program_title',
        'student_name',
        'nisn',
        'class_name',
        'gender',
        'phone',
        'email',
        'experience',
        'reason',
        'extra_data',
        'status',
        'admin_note',
        'submitted_at',
    ];

    protected $casts = [
        'extra_data' => 'array',
        'submitted_at' => 'datetime',
    ];

    public function getTypeLabelAttribute(): string
    {
        return match ($this->registration_type) {
            'osis' => 'OSIS & Kepemimpinan',
            'extracurricular' => 'Ekstrakurikuler',
            'counseling' => 'Bimbingan Konseling',
            default => 'Kesiswaan',
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'Diproses' => 'blue',
            'Selesai' => 'green',
            default => 'yellow',
        };
    }
}