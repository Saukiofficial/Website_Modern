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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();

            $table->string('label');
            $table->string('url');

            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('menus')
                ->nullOnDelete();

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
        Schema::dropIfExists('menus');
    }
};