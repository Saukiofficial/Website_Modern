<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->string('committee_signature')->nullable()->after('form_email');
            $table->string('committee_name')->nullable()->after('committee_signature');
            $table->string('committee_position')->nullable()->after('committee_name');
        });
    }

    public function down(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->dropColumn([
                'committee_signature',
                'committee_name',
                'committee_position',
            ]);
        });
    }
};