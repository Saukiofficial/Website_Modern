<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExtracurricularMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'extracurricular_id',
        'registration_id',
        'student_name',
        'nisn',
        'class_name',
        'gender',
        'phone',
        'email',
        'program_title',
        'role',
        'joined_at',
        'note',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'joined_at' => 'date',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'joined_at_label',
    ];

    public function extracurricular(): BelongsTo
    {
        return $this->belongsTo(Extracurricular::class);
    }

    public function registration(): BelongsTo
    {
        return $this->belongsTo(StudentProgramRegistration::class, 'registration_id');
    }

    protected function joinedAtLabel(): Attribute
    {
        return Attribute::get(fn () => $this->joined_at?->format('d M Y'));
    }
}
