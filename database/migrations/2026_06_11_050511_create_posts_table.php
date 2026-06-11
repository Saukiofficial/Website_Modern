<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();

            $table->string('category')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();

            $table->string('thumbnail')->nullable();
            $table->string('author')->nullable();

            $table->date('published_at')->nullable();

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};