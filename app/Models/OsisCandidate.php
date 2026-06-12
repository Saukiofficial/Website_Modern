<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class OsisCandidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'student_id',
        'candidate_number',
        'name',
        'class_label',
        'photo',
        'slogan',
        'vision',
        'mission',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'photo_url',
    ];

    public function period(): BelongsTo
    {
        return $this->belongsTo(OsisElectionPeriod::class, 'period_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function votes()
    {
        return $this->hasMany(OsisVote::class, 'candidate_id');
    }

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