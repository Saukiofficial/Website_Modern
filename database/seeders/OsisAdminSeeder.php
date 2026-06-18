<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OsisAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'osis@sekolah.test'],
            [
                'name' => 'Admin OSIS',
                'password' => Hash::make('password'),
                'role' => 'osis_admin',
            ]
        );
    }
}