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
        Schema::create('student_achievements', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('student_name')->nullable();
            $table->string('competition_name')->nullable();

            $table->string('level')->nullable();
            $table->string('rank')->nullable();
            $table->string('year')->nullable();

            $table->text('description')->nullable();
            $table->string('image')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_achievements');
    }
};