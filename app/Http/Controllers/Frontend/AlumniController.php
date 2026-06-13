<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $graduationYear = $request->query('graduation_year', 'all');
        $activity = $request->query('activity', 'all');

        $query = Alumni::query()
            ->where('is_active', true)
            ->latest('id');

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('graduation_year', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('current_activity', 'like', "%{$search}%")
                    ->orWhere('institution', 'like', "%{$search}%")
                    ->orWhere('job_position', 'like', "%{$search}%");
            });
        }

        if ($graduationYear !== 'all') {
            $query->where('graduation_year', $graduationYear);
        }

        if ($activity !== 'all') {
            $query->where('current_activity', $activity);
        }

        $alumni = $query
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Alumni $alumni) => [
                'id' => $alumni->id,
                'name' => $alumni->name,
                'gender' => $alumni->gender,
                'graduation_year' => $alumni->graduation_year,
                'class_name' => $alumni->class_name,
                'photo_url' => $alumni->photo_url,
                'current_activity' => $alumni->current_activity,
                'institution' => $alumni->institution,
                'job_position' => $alumni->job_position,
            ]);

        return Inertia::render('Frontend/Alumni/Index', [
            'alumni' => $alumni,
            'filters' => [
                'search' => $search,
                'graduation_year' => $graduationYear,
                'activity' => $activity,
            ],
            'summary' => [
                'total' => Alumni::query()->where('is_active', true)->count(),
                'working' => Alumni::query()
                    ->where('is_active', true)
                    ->where('current_activity', 'Bekerja')
                    ->count(),
                'college' => Alumni::query()
                    ->where('is_active', true)
                    ->where('current_activity', 'Kuliah')
                    ->count(),
                'entrepreneur' => Alumni::query()
                    ->where('is_active', true)
                    ->where('current_activity', 'Wirausaha')
                    ->count(),
            ],
            'graduationYears' => Alumni::query()
                ->where('is_active', true)
                ->whereNotNull('graduation_year')
                ->select('graduation_year')
                ->distinct()
                ->orderByDesc('graduation_year')
                ->pluck('graduation_year')
                ->values(),
        ]);
    }
}