<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PpdbAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'ppdb@sekolah.test'],
            [
                'name' => 'Admin PPDB',
                'password' => Hash::make('password'),
                'role' => 'ppdb_admin',
            ]
        );
    }
}