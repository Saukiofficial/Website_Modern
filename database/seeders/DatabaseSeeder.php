<?php

namespace Database\Seeders;

use Database\Seeders\StudentProgramSeeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\GallerySeeder;
use Database\Seeders\PpdbSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SchoolWebsiteSeeder::class,
            SchoolProfileSeeder::class,
            AcademicSeeder::class,
            StudentProgramSeeder::class,
            PostSeeder::class,
            GallerySeeder::class,
            PpdbSeeder::class,
            SuperAdminSeeder::class,
            PpdbAdminSeeder::class,
            OsisAdminSeeder::class,
            ExtracurricularAdminSeeder::class,
        ]);
    }
}