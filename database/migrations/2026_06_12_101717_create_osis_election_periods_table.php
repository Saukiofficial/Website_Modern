<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('osis_election_periods', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('academic_year')->nullable();

            $table->dateTime('start_at')->nullable();
            $table->dateTime('end_at')->nullable();

            $table->text('description')->nullable();

            $table->boolean('is_active')->default(false);
            $table->boolean('show_result')->default(false);
            $table->boolean('is_secret_vote')->default(true);

            $table->timestamps();

            $table->index('is_active');
            $table->index(['start_at', 'end_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('osis_election_periods');
    }
};