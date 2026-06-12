<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migration.
     */
    public function up(): void
    {
        Schema::create('school_profiles', function (Blueprint $table) {
            $table->id();

            $table->string('school_name')->default('SMA Negeri 1 Sumenep');
            $table->string('short_name')->nullable();
            $table->string('city')->nullable();
            $table->string('tagline')->nullable();

            $table->text('description')->nullable();

            $table->string('hero_image')->nullable();
            $table->string('vision_hero_image')->nullable();
            $table->string('structure_hero_image')->nullable();
            $table->string('history_image')->nullable();
            $table->string('identity_image')->nullable();
            $table->string('vision_banner_image')->nullable();

            $table->string('principal_name')->nullable();
            $table->string('principal_position')->nullable();
            $table->string('principal_image')->nullable();
            $table->text('principal_message')->nullable();

            $table->longText('history')->nullable();
            $table->text('vision')->nullable();
            $table->json('missions')->nullable();

            $table->json('identity')->nullable();
            $table->json('values')->nullable();
            $table->json('profile_stats')->nullable();
            $table->json('hero_stats')->nullable();
            $table->json('history_timeline')->nullable();
            $table->json('vision_mission_items')->nullable();
            $table->json('core_values')->nullable();
            $table->json('vision_action_steps')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};