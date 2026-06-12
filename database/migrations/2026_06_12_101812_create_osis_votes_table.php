<?php

use App\Models\OsisCandidate;
use App\Models\OsisElectionPeriod;
use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('osis_votes', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(OsisElectionPeriod::class, 'period_id')
                ->constrained('osis_election_periods')
                ->cascadeOnDelete();

            $table->foreignIdFor(OsisCandidate::class, 'candidate_id')
                ->constrained('osis_candidates')
                ->cascadeOnDelete();

            $table->foreignIdFor(Student::class, 'student_id')
                ->nullable()
                ->constrained('students')
                ->nullOnDelete();

            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();

            $table->timestamp('voted_at')->nullable();

            $table->timestamps();

            $table->unique(['period_id', 'student_id']);

            $table->index('period_id');
            $table->index('candidate_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('osis_votes');
    }
};