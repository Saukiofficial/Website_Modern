<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PpdbSetting extends Model
{
    protected $fillable = [
        'academic_year',
        'eyebrow',
        'hero_title',
        'hero_description',
        'hero_image',

        'form_logo',
        'form_title',
        'form_school_name',
        'form_address',
        'form_website',
        'form_email',

        'committee_signature',
        'committee_name',
        'committee_position',

        'section_title',
        'section_description',
        'requirement_title',
        'requirement_description',
        'cta_label',
        'cta_url',
        'is_open',
        'closed_message',
    ];

    protected $casts = [
        'is_open' => 'boolean',
    ];

    protected $appends = [
        'hero_image_url',
        'form_logo_url',
        'committee_signature_url',
    ];

    public function getCommitteeSignatureUrlAttribute(): ?string
    {
        return $this->fileUrl($this->committee_signature);
    }

    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->fileUrl($this->hero_image);
    }

    public function getFormLogoUrlAttribute(): ?string
    {
        return $this->fileUrl($this->form_logo);
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