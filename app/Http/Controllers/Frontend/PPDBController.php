<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PPDBController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/PPDB');
    }

    public function register(): Response
    {
        return Inertia::render('Frontend/PPDBRegister');
    }

    public function store(Request $request): RedirectResponse
    {
        return back()->with('success', 'Pendaftaran berhasil dikirim.');
    }
}