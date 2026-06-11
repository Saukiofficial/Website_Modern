<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbRequirement extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_required',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'is_active' => 'boolean',
    ];
}