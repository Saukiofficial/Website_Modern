<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ppdb_registrations', function (Blueprint $table) {
            $table->id();

            $table->string('registration_number')->unique()->nullable();

            $table->string('student_name');
            $table->string('nisn')->nullable();
            $table->string('gender')->nullable();
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('religion')->nullable();
            $table->string('previous_school')->nullable();
            $table->text('address')->nullable();

            $table->string('father_name')->nullable();
            $table->string('father_job')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_job')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->string('family_card_file')->nullable();
            $table->string('birth_certificate_file')->nullable();
            $table->string('certificate_file')->nullable();
            $table->string('report_card_file')->nullable();
            $table->string('photo_file')->nullable();

            $table->string('status')->default('Baru');
            $table->text('admin_note')->nullable();

            $table->timestamp('submitted_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppdb_registrations');
    }
};