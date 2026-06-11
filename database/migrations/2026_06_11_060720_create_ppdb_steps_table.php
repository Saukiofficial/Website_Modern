<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ppdb_steps', function (Blueprint $table) {
            $table->id();

            $table->string('number')->nullable();
            $table->string('step_label')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();

            $table->string('accent_class')->nullable();
            $table->string('icon_bg_class')->nullable();

            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppdb_steps');
    }
};