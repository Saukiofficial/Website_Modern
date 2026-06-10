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

Route::get('/kesiswaan', function () {
    return Inertia::render('Frontend/Kesiswaan');
})->name('kesiswaan');

Route::get('/kesiswaan/osis', function () {
    return Inertia::render('Frontend/KesiswaanDetail', [
        'type' => 'osis',
    ]);
})->name('kesiswaan.osis');

Route::get('/kesiswaan/ekstrakurikuler', function () {
    return Inertia::render('Frontend/KesiswaanDetail', [
        'type' => 'ekstrakurikuler',
    ]);
})->name('kesiswaan.ekstrakurikuler');

Route::get('/kesiswaan/bimbingan-konseling', function () {
    return Inertia::render('Frontend/KesiswaanDetail', [
        'type' => 'bimbingan-konseling',
    ]);
})->name('kesiswaan.bimbingan-konseling');

Route::get('/informasi', function () {
    return Inertia::render('Frontend/Informasi');
})->name('informasi');

Route::get('/galeri', function () {
    return Inertia::render('Frontend/Gallery');
})->name('gallery');

Route::get('/ppdb', function () {
    return Inertia::render('Frontend/PPDB');
})->name('ppdb');

Route::get('/ppdb/daftar', function () {
    return Inertia::render('Frontend/PPDBRegister');
})->name('ppdb.register');