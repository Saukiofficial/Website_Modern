<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\StudentProgramSeeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\GallerySeeder;
use Database\Seeders\PpdbSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sekolah.test'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
            ]
        );

        $this->call([
            SchoolWebsiteSeeder::class,
            SchoolProfileSeeder::class,
            AcademicSeeder::class,
            StudentProgramSeeder::class,
            PostSeeder::class,
            GallerySeeder::class,
            PpdbSeeder::class,
        ]);
    }
}