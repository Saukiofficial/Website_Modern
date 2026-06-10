<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use App\Models\SchoolStatistic;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $homeSection = HomeSection::query()->first();

        $statistics = SchoolStatistic::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function (SchoolStatistic $statistic) {
                return [
                    'id' => $statistic->id,
                    'title' => $statistic->title,
                    'value' => $statistic->value,
                    'desc' => $statistic->description,
                    'icon' => $statistic->icon,
                ];
            });

        return Inertia::render('Frontend/Home', [
            'homeSection' => $homeSection ? [
                'hero_title' => $homeSection->hero_title,
                'hero_subtitle' => $homeSection->hero_subtitle,
                'hero_button_text' => $homeSection->hero_button_text,
                'hero_button_url' => $homeSection->hero_button_url,
                'hero_background_url' => $homeSection->hero_background_url,
                'hero_image_url' => $homeSection->hero_image_url,
                'ppdb_title' => $homeSection->ppdb_title,
                'ppdb_description' => $homeSection->ppdb_description,
                'ppdb_button_text' => $homeSection->ppdb_button_text,
                'ppdb_button_url' => $homeSection->ppdb_button_url,
            ] : null,

            'statistics' => $statistics,
        ]);
    }
}