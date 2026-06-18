<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('student_program_registrations', function (Blueprint $table) {
            if (! Schema::hasColumn('student_program_registrations', 'registration_number')) {
                $table->string('registration_number')->unique()->nullable()->after('id');
            }

            if (! Schema::hasColumn('student_program_registrations', 'approved_role')) {
                $table->string('approved_role')->nullable()->after('admin_note');
            }

            if (! Schema::hasColumn('student_program_registrations', 'publish_to_frontend')) {
                $table->boolean('publish_to_frontend')->default(false)->after('approved_role');
            }

            if (! Schema::hasColumn('student_program_registrations', 'announced_at')) {
                $table->timestamp('announced_at')->nullable()->after('publish_to_frontend');
            }
        });
    }

    public function down(): void
    {
        Schema::table('student_program_registrations', function (Blueprint $table) {
            if (Schema::hasColumn('student_program_registrations', 'announced_at')) {
                $table->dropColumn('announced_at');
            }

            if (Schema::hasColumn('student_program_registrations', 'publish_to_frontend')) {
                $table->dropColumn('publish_to_frontend');
            }

            if (Schema::hasColumn('student_program_registrations', 'approved_role')) {
                $table->dropColumn('approved_role');
            }

            if (Schema::hasColumn('student_program_registrations', 'registration_number')) {
                $table->dropColumn('registration_number');
            }
        });
    }
};
