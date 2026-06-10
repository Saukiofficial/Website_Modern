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
        Schema::create('organization_structures', function (Blueprint $table) {
            $table->id();

            $table->string('role');
            $table->string('name');
            $table->text('description')->nullable();

            $table->string('image')->nullable();
            $table->string('fallback_image')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_principal')->default(false);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_structures');
    }
};