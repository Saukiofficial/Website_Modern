<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PpdbRegistration extends Model
{
    protected $fillable = [
        'registration_number',
        'student_name',
        'nisn',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'previous_school',
        'address',
        'father_name',
        'father_job',
        'mother_name',
        'mother_job',
        'phone',
        'email',
        'family_card_file',
        'birth_certificate_file',
        'certificate_file',
        'report_card_file',
        'photo_file',
        'status',
        'admin_note',
        'submitted_at',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'submitted_at' => 'datetime',
    ];

    protected $appends = [
        'family_card_url',
        'birth_certificate_url',
        'certificate_url',
        'report_card_url',
        'photo_url',
        'status_color',
    ];

    public function getFamilyCardUrlAttribute(): ?string
    {
        return $this->fileUrl($this->family_card_file);
    }

    public function getBirthCertificateUrlAttribute(): ?string
    {
        return $this->fileUrl($this->birth_certificate_file);
    }

    public function getCertificateUrlAttribute(): ?string
    {
        return $this->fileUrl($this->certificate_file);
    }

    public function getReportCardUrlAttribute(): ?string
    {
        return $this->fileUrl($this->report_card_file);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->fileUrl($this->photo_file);
    }

    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'Diproses' => 'blue',
            'Diterima' => 'green',
            'Ditolak' => 'red',
            default => 'yellow',
        };
    }

    private function fileUrl(?string $file): ?string
    {
        if (! $file) {
            return null;
        }

        if (str_starts_with($file, 'http')) {
            return $file;
        }

        if (str_starts_with($file, '/')) {
            return $file;
        }

        return Storage::url($file);
    }
}