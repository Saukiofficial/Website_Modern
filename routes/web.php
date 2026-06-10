<?php

use App\Http\Controllers\Admin\Auth\LoginController as AdminLoginController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\HomeSectionController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\SchoolSettingController;
use App\Http\Controllers\Frontend\AcademicController;
use App\Http\Controllers\Frontend\GalleryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\InformasiController;
use App\Http\Controllers\Frontend\KesiswaanController;
use App\Http\Controllers\Frontend\PPDBController;
use App\Http\Controllers\Frontend\ProfileController;
use App\Http\Controllers\Admin\ProfileStructureController;
use App\Http\Controllers\Admin\AcademicController as AdminAcademicController;
use App\Http\Controllers\Admin\AcademicTeacherController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/profil', [ProfileController::class, 'index'])->name('profile');

Route::get('/akademik', [AcademicController::class, 'index'])->name('academic');

Route::get('/kesiswaan', [KesiswaanController::class, 'index'])->name('kesiswaan');

Route::get('/kesiswaan/{slug}', [KesiswaanController::class, 'show'])
    ->whereIn('slug', ['osis', 'ekstrakurikuler', 'bimbingan-konseling'])
    ->name('kesiswaan.show');

Route::get('/informasi', [InformasiController::class, 'index'])->name('informasi');

Route::get('/galeri', [GalleryController::class, 'index'])->name('gallery');

Route::get('/ppdb', [PPDBController::class, 'index'])->name('ppdb');

Route::get('/ppdb/daftar', [PPDBController::class, 'register'])->name('ppdb.register');

Route::post('/ppdb/daftar', [PPDBController::class, 'store'])->name('ppdb.store');

/*
|--------------------------------------------------------------------------
| Admin Auth Custom React
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return redirect()->route('admin.login');
    })->name('login');

    Route::get('/admin/login', [AdminLoginController::class, 'create'])
        ->name('admin.login');

    Route::post('/admin/login', [AdminLoginController::class, 'store'])
        ->name('admin.login.store');
});

Route::post('/admin/logout', [AdminLoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('admin.logout');

/*
|--------------------------------------------------------------------------
| Admin Custom React
|--------------------------------------------------------------------------
*/

Route::redirect('/admin', '/admin/dashboard');

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth'])
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/settings', [SchoolSettingController::class, 'edit'])
            ->name('settings.edit');

        Route::post('/settings', [SchoolSettingController::class, 'update'])
            ->name('settings.update');

        Route::get('/menus', [MenuController::class, 'index'])
            ->name('menus.index');

        Route::get('/menus/create', [MenuController::class, 'create'])
            ->name('menus.create');

        Route::post('/menus', [MenuController::class, 'store'])
            ->name('menus.store');

        Route::get('/menus/{menu}/edit', [MenuController::class, 'edit'])
            ->name('menus.edit');

        Route::put('/menus/{menu}', [MenuController::class, 'update'])
            ->name('menus.update');

        Route::delete('/menus/{menu}', [MenuController::class, 'destroy'])
            ->name('menus.destroy');

        Route::get('/home', [HomeSectionController::class, 'edit'])
            ->name('home.edit');

        Route::post('/home', [HomeSectionController::class, 'update'])
            ->name('home.update');

        Route::get('/profiles', [AdminProfileController::class, 'edit'])
            ->name('profiles.edit');

        Route::post('/profiles', [AdminProfileController::class, 'update'])
            ->name('profiles.update');

        Route::get('/profiles/structure', [ProfileStructureController::class, 'edit'])
            ->name('profiles.structure.edit');

        Route::post('/profiles/structure', [ProfileStructureController::class, 'update'])
            ->name('profiles.structure.update');

        Route::get('/academics', [AdminAcademicController::class, 'edit'])
            ->name('academics.edit');

        Route::post('/academics', [AdminAcademicController::class, 'update'])
            ->name('academics.update');

        Route::get('/academics/teachers', [AcademicTeacherController::class, 'index'])
            ->name('academics.teachers.index');

        Route::get('/academics/teachers/create', [AcademicTeacherController::class, 'create'])
            ->name('academics.teachers.create');

        Route::post('/academics/teachers', [AcademicTeacherController::class, 'store'])
            ->name('academics.teachers.store');

        Route::get('/academics/teachers/{teacher}/edit', [AcademicTeacherController::class, 'edit'])
            ->name('academics.teachers.edit');

        Route::put('/academics/teachers/{teacher}', [AcademicTeacherController::class, 'update'])
            ->name('academics.teachers.update');

        Route::delete('/academics/teachers/{teacher}', [AcademicTeacherController::class, 'destroy'])
            ->name('academics.teachers.destroy');
    });