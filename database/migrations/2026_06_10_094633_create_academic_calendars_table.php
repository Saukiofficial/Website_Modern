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
        Schema::create('academic_calendars', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('description')->nullable();

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->string('date_text')->nullable();
            $table->string('category')->nullable();
            $table->string('icon')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_calendars');
    }
};