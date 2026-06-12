<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OsisVoter extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'student_id',
        'token',
        'has_voted',
        'voted_at',
    ];

    protected $casts = [
        'has_voted' => 'boolean',
        'voted_at' => 'datetime',
    ];

    public function period(): BelongsTo
    {
        return $this->belongsTo(OsisElectionPeriod::class, 'period_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}