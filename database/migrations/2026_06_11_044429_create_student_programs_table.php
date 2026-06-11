<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_programs', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->nullable();

            $table->string('eyebrow')->nullable();
            $table->string('hero_title')->nullable();
            $table->text('description')->nullable();
            $table->string('hero_image')->nullable();

            $table->string('icon')->nullable();

            $table->string('form_title')->nullable();
            $table->text('form_description')->nullable();

            $table->string('interest_label')->nullable();
            $table->json('interest_options')->nullable();

            $table->string('reason_label')->nullable();
            $table->text('reason_placeholder')->nullable();

            $table->json('points')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_programs');
    }
};