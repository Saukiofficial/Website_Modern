<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ExtracurricularAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'ekskul@sekolah.test'],
            [
                'name' => 'Admin Ekstrakurikuler',
                'password' => Hash::make('password'),
                'role' => 'extracurricular_admin',
            ]
        );
    }
}