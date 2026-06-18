<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isPpdbAdmin(): bool
    {
        return $this->role === 'ppdb_admin';
    }

    public function isOsisAdmin(): bool
    {
        return $this->role === 'osis_admin';
    }

    public function isExtracurricularAdmin(): bool
    {
        return $this->role === 'extracurricular_admin';
    }

    public function adminHomePath(): string
    {
        return match ($this->role) {
            'ppdb_admin' => '/admin/ppdb/dashboard',
            'osis_admin' => '/admin/osis/dashboard',
            'extracurricular_admin' => '/admin/ekstrakurikuler/dashboard',
            default => '/admin/dashboard',
        };
    }
}