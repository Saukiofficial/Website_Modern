<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            if (! Schema::hasColumn('ppdb_settings', 'report_location')) {
                $table->string('report_location')->nullable()->after('committee_position');
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            if (Schema::hasColumn('ppdb_settings', 'report_location')) {
                $table->dropColumn('report_location');
            }
        });
    }
};