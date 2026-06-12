<?php

use App\Models\OsisElectionPeriod;
use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('osis_candidates', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(OsisElectionPeriod::class, 'period_id')
                ->constrained('osis_election_periods')
                ->cascadeOnDelete();

            $table->foreignIdFor(Student::class, 'student_id')
                ->nullable()
                ->constrained('students')
                ->nullOnDelete();

            $table->string('candidate_number')->nullable();
            $table->string('name');
            $table->string('class_label')->nullable();

            $table->string('photo')->nullable();
            $table->string('slogan')->nullable();

            $table->text('vision')->nullable();
            $table->text('mission')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index('period_id');
            $table->index('student_id');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('osis_candidates');
    }
};