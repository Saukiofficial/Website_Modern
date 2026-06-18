<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('students', 'academic_year')) {
            Schema::table('students', function (Blueprint $table) {
                $table->string('academic_year')->nullable()->after('class_name');
            });
        }

        if (! Schema::hasColumn('students', 'student_status')) {
            Schema::table('students', function (Blueprint $table) {
                $table->string('student_status')->default('aktif')->after('academic_year');
            });
        }

        if (! Schema::hasColumn('students', 'graduation_year')) {
            Schema::table('students', function (Blueprint $table) {
                $table->year('graduation_year')->nullable()->after('student_status');
            });
        }
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            if (Schema::hasColumn('students', 'graduation_year')) {
                $table->dropColumn('graduation_year');
            }

            if (Schema::hasColumn('students', 'student_status')) {
                $table->dropColumn('student_status');
            }

            if (Schema::hasColumn('students', 'academic_year')) {
                $table->dropColumn('academic_year');
            }
        });
    }
};
