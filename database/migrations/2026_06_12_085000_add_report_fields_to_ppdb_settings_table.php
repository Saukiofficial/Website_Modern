<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            if (! Schema::hasColumn('ppdb_settings', 'form_logo')) {
                $table->string('form_logo')->nullable()->after('hero_image');
            }

            if (! Schema::hasColumn('ppdb_settings', 'form_title')) {
                $table->string('form_title')->nullable()->after('form_logo');
            }

            if (! Schema::hasColumn('ppdb_settings', 'form_school_name')) {
                $table->string('form_school_name')->nullable()->after('form_title');
            }

            if (! Schema::hasColumn('ppdb_settings', 'form_address')) {
                $table->string('form_address')->nullable()->after('form_school_name');
            }

            if (! Schema::hasColumn('ppdb_settings', 'form_website')) {
                $table->string('form_website')->nullable()->after('form_address');
            }

            if (! Schema::hasColumn('ppdb_settings', 'form_email')) {
                $table->string('form_email')->nullable()->after('form_website');
            }

            if (! Schema::hasColumn('ppdb_settings', 'committee_signature')) {
                $table->string('committee_signature')->nullable()->after('form_email');
            }

            if (! Schema::hasColumn('ppdb_settings', 'committee_name')) {
                $table->string('committee_name')->nullable()->after('committee_signature');
            }

            if (! Schema::hasColumn('ppdb_settings', 'committee_position')) {
                $table->string('committee_position')->nullable()->after('committee_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $columns = [
                'form_logo',
                'form_title',
                'form_school_name',
                'form_address',
                'form_website',
                'form_email',
                'committee_signature',
                'committee_name',
                'committee_position',
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('ppdb_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};