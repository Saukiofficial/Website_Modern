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
        Schema::create('osis_members', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('position');
            $table->string('class_name')->nullable();

            $table->text('description')->nullable();
            $table->string('image')->nullable();

            $table->string('period')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_leader')->default(false);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('osis_members');
    }
};