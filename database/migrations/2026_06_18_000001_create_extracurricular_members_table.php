<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('extracurricular_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('extracurricular_id')->nullable()->constrained('extracurriculars')->nullOnDelete();
            $table->foreignId('registration_id')->nullable()->unique()->constrained('student_program_registrations')->nullOnDelete();
            $table->string('student_name');
            $table->string('nisn')->nullable();
            $table->string('class_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('program_title')->nullable();
            $table->string('role')->default('Anggota');
            $table->date('joined_at')->nullable();
            $table->text('note')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['extracurricular_id', 'is_active']);
            $table->index(['nisn', 'program_title']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extracurricular_members');
    }
};
