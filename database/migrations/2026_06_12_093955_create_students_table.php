<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();

            $table->string('student_number')->nullable()->unique();
            $table->string('nisn')->nullable()->unique();

            $table->string('name');
            $table->string('gender')->nullable();

            $table->string('class_level')->nullable();
            $table->string('class_name')->nullable();

            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();

            $table->string('religion')->nullable();
            $table->text('address')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();

            $table->string('photo')->nullable();

            $table->string('voting_token')->nullable()->unique();
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['class_level', 'class_name']);
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};