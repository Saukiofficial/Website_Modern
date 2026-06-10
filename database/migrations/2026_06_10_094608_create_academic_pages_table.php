<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migration.
     */
    public function up(): void
    {
        Schema::create('academic_pages', function (Blueprint $table) {
            $table->id();

            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->string('hero_image')->nullable();

            $table->string('calendar_title')->nullable();
            $table->text('calendar_description')->nullable();

            $table->string('teacher_title')->nullable();
            $table->text('teacher_description')->nullable();

            $table->string('extracurricular_title')->nullable();
            $table->text('extracurricular_description')->nullable();

            $table->string('osis_title')->nullable();
            $table->text('osis_description')->nullable();

            $table->string('achievement_title')->nullable();
            $table->text('achievement_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_pages');
    }
};