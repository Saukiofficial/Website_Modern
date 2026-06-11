<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PpdbTimeline extends Model
{
    protected $fillable = [
        'title',
        'date_text',
        'icon',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}