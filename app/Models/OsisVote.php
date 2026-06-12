<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OsisVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'candidate_id',
        'student_id',
        'ip_address',
        'user_agent',
        'voted_at',
    ];

    protected $casts = [
        'voted_at' => 'datetime',
    ];

    public function period(): BelongsTo
    {
        return $this->belongsTo(OsisElectionPeriod::class, 'period_id');
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(OsisCandidate::class, 'candidate_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}