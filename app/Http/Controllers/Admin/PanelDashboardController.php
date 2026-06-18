<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Models\ExtracurricularMember;
use App\Models\PpdbRegistration;
use App\Models\StudentProgramRegistration;
use Inertia\Inertia;
use Inertia\Response;

class PanelDashboardController extends Controller
{
    public function ppdb(): Response
    {
        return Inertia::render('Admin/Panels/PpdbDashboard', [
            'summary' => [
                'total' => PpdbRegistration::query()->count(),
                'baru' => PpdbRegistration::query()->where('status', 'Baru')->count(),
                'diproses' => PpdbRegistration::query()->where('status', 'Diproses')->count(),
                'diterima' => PpdbRegistration::query()->where('status', 'Diterima')->count(),
                'ditolak' => PpdbRegistration::query()->where('status', 'Ditolak')->count(),
            ],
        ]);
    }

    public function osis(): Response
    {
        return Inertia::render('Admin/Panels/OsisDashboard', [
            'summary' => [
                'total' => StudentProgramRegistration::query()->where('registration_type', 'osis')->count(),
                'baru' => StudentProgramRegistration::query()->where('registration_type', 'osis')->where('status', 'Baru')->count(),
                'diproses' => StudentProgramRegistration::query()->where('registration_type', 'osis')->where('status', 'Diproses')->count(),
                'diterima' => StudentProgramRegistration::query()->where('registration_type', 'osis')->where('status', 'Diterima')->count(),
                'ditolak' => StudentProgramRegistration::query()->where('registration_type', 'osis')->where('status', 'Ditolak')->count(),
            ],
        ]);
    }

    public function extracurricular(): Response
    {
        return Inertia::render('Admin/Panels/ExtracurricularDashboard', [
            'summary' => [
                'total' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->count(),
                'baru' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Baru')->count(),
                'diproses' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Diproses')->count(),
                'diterima' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Diterima')->count(),
                'ditolak' => StudentProgramRegistration::query()->where('registration_type', 'extracurricular')->where('status', 'Ditolak')->count(),
                'members' => ExtracurricularMember::query()->count(),
                'active_members' => ExtracurricularMember::query()->where('is_active', true)->count(),
                'programs' => Extracurricular::query()->count(),
            ],
        ]);
    }
}
