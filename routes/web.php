<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontend/Home');
})->name('home');

Route::get('/profil', function () {
    return Inertia::render('Frontend/Profile');
})->name('profile');

Route::get('/akademik', function () {
    return Inertia::render('Frontend/Academic');
})->name('academic');