<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->string('form_logo')->nullable()->after('hero_image');
            $table->string('form_title')->nullable()->after('form_logo');
            $table->string('form_school_name')->nullable()->after('form_title');
            $table->string('form_address')->nullable()->after('form_school_name');
            $table->string('form_website')->nullable()->after('form_address');
            $table->string('form_email')->nullable()->after('form_website');
        });
    }

    public function down(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->dropColumn([
                'form_logo',
                'form_title',
                'form_school_name',
                'form_address',
                'form_website',
                'form_email',
            ]);
        });
    }
};