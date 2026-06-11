<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ppdb_settings', function (Blueprint $table) {
            $table->id();

            $table->string('academic_year')->nullable();

            $table->string('eyebrow')->nullable();
            $table->string('hero_title')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();

            $table->string('section_title')->nullable();
            $table->text('section_description')->nullable();

            $table->string('requirement_title')->nullable();
            $table->text('requirement_description')->nullable();

            $table->string('cta_label')->nullable();
            $table->string('cta_url')->nullable();

            $table->boolean('is_open')->default(true);
            $table->text('closed_message')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppdb_settings');
    }
};