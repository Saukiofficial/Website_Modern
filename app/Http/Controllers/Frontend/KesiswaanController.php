<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\StudentProgram;
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
            ->map(function (StudentProgram $program) {
                return [
                    'id' => $program->id,
                    'title' => $program->title,
                    'slug' => $program->slug,
                    'category' => $program->category,
                    'description' => $program->description,
                    'hero_image_url' => $program->hero_image_url,
                    'icon' => $program->icon,
                    'sort_order' => $program->sort_order,
                    'is_active' => $program->is_active,
                ];
            });

        return Inertia::render('Frontend/Kesiswaan', [
            'programs' => $programs,
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
            'program' => $program ? [
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
                'is_active' => $program->is_active,
            ] : null,
        ]);
    }
}