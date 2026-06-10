<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class KesiswaanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/Kesiswaan');
    }

    public function show(string $slug): Response
    {
        $allowedTypes = [
            'osis',
            'ekstrakurikuler',
            'bimbingan-konseling',
        ];

        $type = in_array($slug, $allowedTypes, true) ? $slug : 'osis';

        return Inertia::render('Frontend/KesiswaanDetail', [
            'type' => $type,
        ]);
    }
}