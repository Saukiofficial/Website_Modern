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
        Schema::create('osis_voters', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(OsisElectionPeriod::class, 'period_id')
                ->constrained('osis_election_periods')
                ->cascadeOnDelete();

            $table->foreignIdFor(Student::class, 'student_id')
                ->constrained('students')
                ->cascadeOnDelete();

            $table->string('token')->nullable();

            $table->boolean('has_voted')->default(false);
            $table->timestamp('voted_at')->nullable();

            $table->timestamps();

            $table->unique(['period_id', 'student_id']);
            $table->unique(['period_id', 'token']);

            $table->index('has_voted');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('osis_voters');
    }
};