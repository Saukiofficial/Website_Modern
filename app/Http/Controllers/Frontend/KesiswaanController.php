<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
use App\Models\StudentProgramRegistration;
use Inertia\Inertia;
use Inertia\Response;

class KesiswaanController extends Controller
{
    public function index(): Response
    {
        $programs = StudentProgram::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (StudentProgram $program) => $this->programPayload($program));

        $extracurricularMembers = StudentProgramRegistration::query()
            ->where('registration_type', 'extracurricular')
            ->where('status', 'Diterima')
            ->where('publish_to_frontend', true)
            ->latest('announced_at')
            ->latest('id')
            ->take(12)
            ->get()
            ->map(fn (StudentProgramRegistration $registration) => $this->memberPayload($registration));

        $osisMembers = StudentProgramRegistration::query()
            ->where('registration_type', 'osis')
            ->where('status', 'Diterima')
            ->where('publish_to_frontend', true)
            ->latest('announced_at')
            ->latest('id')
            ->take(12)
            ->get()
            ->map(fn (StudentProgramRegistration $registration) => $this->memberPayload($registration));

        return Inertia::render('Frontend/Kesiswaan', [
            'programs' => $programs,
            'extracurricularMembers' => $extracurricularMembers,
            'osisMembers' => $osisMembers,
        ]);
    }

    public function show(string $slug): Response
    {
        $program = StudentProgram::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        return Inertia::render('Frontend/KesiswaanDetail', [
            'type' => $slug,
            'program' => $program ? $this->programPayload($program) : null,
        ]);
    }

    private function programPayload(StudentProgram $program): array
    {
        return [
            'id' => $program->id,
            'title' => $program->title,
            'slug' => $program->slug,
            'category' => $program->category,
            'eyebrow' => $program->eyebrow,
            'hero_title' => $program->hero_title,
            'description' => $program->description,
            'hero_image_url' => $program->hero_image_url,
            'icon' => $program->icon,
            'form_title' => $program->form_title,
            'form_description' => $program->form_description,
            'interest_label' => $program->interest_label,
            'interest_options' => $program->interest_options ?? [],
            'reason_label' => $program->reason_label,
            'reason_placeholder' => $program->reason_placeholder,
            'points' => $program->points ?? [],
            'sort_order' => $program->sort_order,
        ];
    }

    private function memberPayload(StudentProgramRegistration $registration): array
    {
        return [
            'id' => $registration->id,
            'name' => $registration->student_name,
            'class_name' => $registration->class_name,
            'program_title' => $registration->program_title,
            'approved_role' => $registration->approved_role,
            'type_label' => $registration->type_label,
        ];
    }
}
