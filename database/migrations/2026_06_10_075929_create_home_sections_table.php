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
        Schema::create('home_sections', function (Blueprint $table) {
            $table->id();

            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();

            $table->string('hero_button_text')->nullable();
            $table->string('hero_button_url')->nullable();

            $table->string('hero_background')->nullable();
            $table->string('hero_image')->nullable();

            $table->string('ppdb_title')->nullable();
            $table->text('ppdb_description')->nullable();
            $table->string('ppdb_button_text')->nullable();
            $table->string('ppdb_button_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_sections');
    }
};