<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OsisElectionPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'academic_year',
        'start_at',
        'end_at',
        'description',
        'is_active',
        'show_result',
        'is_secret_vote',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'is_active' => 'boolean',
        'show_result' => 'boolean',
        'is_secret_vote' => 'boolean',
    ];

    public function candidates(): HasMany
    {
        return $this->hasMany(OsisCandidate::class, 'period_id');
    }

    public function voters(): HasMany
    {
        return $this->hasMany(OsisVoter::class, 'period_id');
    }

    public function votes(): HasMany
    {
        return $this->hasMany(OsisVote::class, 'period_id');
    }

    public function getIsRunningAttribute(): bool
    {
        if (! $this->is_active) {
            return false;
        }

        $now = now();

        if ($this->start_at && $now->lt($this->start_at)) {
            return false;
        }

        if ($this->end_at && $now->gt($this->end_at)) {
            return false;
        }

        return true;
    }
}