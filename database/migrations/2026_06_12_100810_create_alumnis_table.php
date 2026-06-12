<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alumnis', function (Blueprint $table) {
            $table->id();

            $table->string('student_number')->nullable();
            $table->string('nisn')->nullable();

            $table->string('name');
            $table->string('gender')->nullable();

            $table->string('graduation_year')->nullable();
            $table->string('class_name')->nullable();

            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->text('address')->nullable();

            $table->string('current_activity')->nullable();
            $table->string('institution')->nullable();
            $table->string('job_position')->nullable();

            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index('graduation_year');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alumnis');
    }
};