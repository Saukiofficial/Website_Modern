<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_program_registrations', function (Blueprint $table) {
            $table->id();

            $table->string('registration_type');
            $table->string('program_title')->nullable();

            $table->string('student_name');
            $table->string('nisn')->nullable();
            $table->string('class_name')->nullable();
            $table->string('gender')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->text('experience')->nullable();
            $table->text('reason')->nullable();

            $table->json('extra_data')->nullable();

            $table->string('status')->default('Baru');
            $table->text('admin_note')->nullable();

            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_program_registrations');
    }
};