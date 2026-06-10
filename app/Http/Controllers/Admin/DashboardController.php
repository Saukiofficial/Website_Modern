<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use App\Models\Menu;
use App\Models\SchoolSetting;
use App\Models\SchoolStatistic;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'summary' => [
                'school_settings' => SchoolSetting::query()->count(),
                'menus' => Menu::query()->count(),
                'home_sections' => HomeSection::query()->count(),
                'statistics' => SchoolStatistic::query()->count(),
            ],
        ]);
    }
}