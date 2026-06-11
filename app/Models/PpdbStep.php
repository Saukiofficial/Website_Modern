<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbStep extends Model
{
    protected $fillable = [
        'number',
        'step_label',
        'title',
        'description',
        'icon',
        'accent_class',
        'icon_bg_class',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}