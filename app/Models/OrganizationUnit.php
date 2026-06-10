<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganizationUnit extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}