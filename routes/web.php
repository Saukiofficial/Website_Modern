<?php

use App\Http\Controllers\Admin\AcademicAchievementController;
use App\Http\Controllers\Admin\AcademicController as AdminAcademicController;
use App\Http\Controllers\Admin\AcademicExtracurricularController;
use App\Http\Controllers\Admin\AcademicOsisMemberController;
use App\Http\Controllers\Admin\AcademicTeacherController;
use App\Http\Controllers\Admin\Auth\LoginController as AdminLoginController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\HomeSectionController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PpdbContentController;
use App\Http\Controllers\Admin\PpdbRegistrationController as AdminPpdbRegistrationController;
use App\Http\Controllers\Admin\PpdbSettingController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProfileStructureController;
use App\Http\Controllers\Admin\SchoolSettingController;
use App\Http\Controllers\Admin\StudentProgramController;
use App\Http\Controllers\Admin\StudentProgramRegistrationController as AdminStudentProgramRegistrationController;
use App\Http\Controllers\Frontend\AcademicController;
use App\Http\Controllers\Frontend\GalleryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\KesiswaanController;
use App\Http\Controllers\Frontend\PostController as FrontendPostController;
use App\Http\Controllers\Frontend\PPDBController;
use App\Http\Controllers\Frontend\ProfileController;
use App\Http\Controllers\Frontend\StudentProgramRegistrationController;
use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Admin\AlumniController as AdminAlumniController;
use App\Http\Controllers\Admin\OsisElectionController as AdminOsisElectionController;
use App\Http\Controllers\Frontend\OsisVotingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/profil', [ProfileController::class, 'index'])->name('profile');

Route::get('/akademik', [AcademicController::class, 'index'])->name('academic');

Route::get('/kesiswaan', [KesiswaanController::class, 'index'])->name('kesiswaan');

Route::get('/kesiswaan/{slug}', [KesiswaanController::class, 'show'])
    ->whereIn('slug', ['osis', 'ekstrakurikuler', 'bimbingan-konseling'])
    ->name('kesiswaan.show');

Route::post('/kesiswaan/{type}/daftar', [StudentProgramRegistrationController::class, 'store'])
    ->whereIn('type', ['osis', 'ekstrakurikuler', 'bimbingan-konseling'])
    ->name('kesiswaan.register.store');

Route::get('/informasi', [FrontendPostController::class, 'index'])
    ->name('informasi');

Route::get('/informasi/{slug}', [FrontendPostController::class, 'show'])
    ->name('informasi.show');

Route::get('/galeri', [GalleryController::class, 'index'])->name('gallery');

/*
|--------------------------------------------------------------------------
| Frontend PPDB
|--------------------------------------------------------------------------
*/

Route::get('/ppdb', [PPDBController::class, 'index'])->name('ppdb');

Route::get('/ppdb/pengumuman', [PPDBController::class, 'announcement'])
    ->name('ppdb.announcement');

Route::post('/ppdb/pengumuman/cek', [PPDBController::class, 'checkAnnouncement'])
    ->name('ppdb.announcement.check');

Route::get('/ppdb/pengumuman/cetak/{registration}', [PPDBController::class, 'printAnnouncement'])
    ->name('ppdb.announcement.print');

Route::get('/ppdb/daftar', [PPDBController::class, 'register'])
    ->name('ppdb.register');

Route::post('/ppdb/daftar', [PPDBController::class, 'store'])
    ->name('ppdb.store');



/*
|--------------------------------------------------------------------------
| Front End Pemilihan Ketua Osis
|--------------------------------------------------------------------------
*/
Route::get('/pemilihan-osis', [OsisVotingController::class, 'index'])
    ->name('osis-voting.index');

Route::post('/pemilihan-osis/login', [OsisVotingController::class, 'login'])
    ->name('osis-voting.login');

Route::get('/pemilihan-osis/vote', [OsisVotingController::class, 'votePage'])
    ->name('osis-voting.vote');

Route::post('/pemilihan-osis/vote', [OsisVotingController::class, 'submitVote'])
    ->name('osis-voting.submit');

Route::post('/pemilihan-osis/logout', [OsisVotingController::class, 'logout'])
    ->name('osis-voting.logout');

/*


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

        Route::get('/academics/extracurriculars', [AcademicExtracurricularController::class, 'index'])
            ->name('academics.extracurriculars.index');

        Route::get('/academics/extracurriculars/create', [AcademicExtracurricularController::class, 'create'])
            ->name('academics.extracurriculars.create');

        Route::post('/academics/extracurriculars', [AcademicExtracurricularController::class, 'store'])
            ->name('academics.extracurriculars.store');

        Route::get('/academics/extracurriculars/{extracurricular}/edit', [AcademicExtracurricularController::class, 'edit'])
            ->name('academics.extracurriculars.edit');

        Route::put('/academics/extracurriculars/{extracurricular}', [AcademicExtracurricularController::class, 'update'])
            ->name('academics.extracurriculars.update');

        Route::delete('/academics/extracurriculars/{extracurricular}', [AcademicExtracurricularController::class, 'destroy'])
            ->name('academics.extracurriculars.destroy');

        Route::get('/academics/osis-members', [AcademicOsisMemberController::class, 'index'])
            ->name('academics.osis-members.index');

        Route::get('/academics/osis-members/create', [AcademicOsisMemberController::class, 'create'])
            ->name('academics.osis-members.create');

        Route::post('/academics/osis-members', [AcademicOsisMemberController::class, 'store'])
            ->name('academics.osis-members.store');

        Route::get('/academics/osis-members/{osisMember}/edit', [AcademicOsisMemberController::class, 'edit'])
            ->name('academics.osis-members.edit');

        Route::put('/academics/osis-members/{osisMember}', [AcademicOsisMemberController::class, 'update'])
            ->name('academics.osis-members.update');

        Route::delete('/academics/osis-members/{osisMember}', [AcademicOsisMemberController::class, 'destroy'])
            ->name('academics.osis-members.destroy');

        Route::get('/academics/achievements', [AcademicAchievementController::class, 'index'])
            ->name('academics.achievements.index');

        Route::get('/academics/achievements/create', [AcademicAchievementController::class, 'create'])
            ->name('academics.achievements.create');

        Route::post('/academics/achievements', [AcademicAchievementController::class, 'store'])
            ->name('academics.achievements.store');

        Route::get('/academics/achievements/{achievement}/edit', [AcademicAchievementController::class, 'edit'])
            ->name('academics.achievements.edit');

        Route::put('/academics/achievements/{achievement}', [AcademicAchievementController::class, 'update'])
            ->name('academics.achievements.update');

        Route::delete('/academics/achievements/{achievement}', [AcademicAchievementController::class, 'destroy'])
            ->name('academics.achievements.destroy');

        Route::get('/student-programs', [StudentProgramController::class, 'index'])
            ->name('student-programs.index');

        Route::get('/student-programs/create', [StudentProgramController::class, 'create'])
            ->name('student-programs.create');

        Route::post('/student-programs', [StudentProgramController::class, 'store'])
            ->name('student-programs.store');

        Route::get('/student-programs/{studentProgram}/edit', [StudentProgramController::class, 'edit'])
            ->name('student-programs.edit');

        Route::put('/student-programs/{studentProgram}', [StudentProgramController::class, 'update'])
            ->name('student-programs.update');

        Route::delete('/student-programs/{studentProgram}', [StudentProgramController::class, 'destroy'])
            ->name('student-programs.destroy');

        Route::get('/student-registrations', [AdminStudentProgramRegistrationController::class, 'index'])
            ->name('student-registrations.index');

        Route::get('/student-registrations/{registration}', [AdminStudentProgramRegistrationController::class, 'show'])
            ->name('student-registrations.show');

        Route::put('/student-registrations/{registration}', [AdminStudentProgramRegistrationController::class, 'update'])
            ->name('student-registrations.update');

        Route::delete('/student-registrations/{registration}', [AdminStudentProgramRegistrationController::class, 'destroy'])
            ->name('student-registrations.destroy');

        Route::get('/posts', [PostController::class, 'index'])
            ->name('posts.index');

        Route::get('/posts/create', [PostController::class, 'create'])
            ->name('posts.create');

        Route::post('/posts', [PostController::class, 'store'])
            ->name('posts.store');

        Route::get('/posts/{post}/edit', [PostController::class, 'edit'])
            ->name('posts.edit');

        Route::put('/posts/{post}', [PostController::class, 'update'])
            ->name('posts.update');

        Route::delete('/posts/{post}', [PostController::class, 'destroy'])
            ->name('posts.destroy');

        Route::get('/galleries', [AdminGalleryController::class, 'index'])
            ->name('galleries.index');

        Route::get('/galleries/create', [AdminGalleryController::class, 'create'])
            ->name('galleries.create');

        Route::post('/galleries', [AdminGalleryController::class, 'store'])
            ->name('galleries.store');

        Route::get('/galleries/{gallery}/edit', [AdminGalleryController::class, 'edit'])
            ->name('galleries.edit');

        Route::put('/galleries/{gallery}', [AdminGalleryController::class, 'update'])
            ->name('galleries.update');

        Route::delete('/galleries/{gallery}', [AdminGalleryController::class, 'destroy'])
            ->name('galleries.destroy');

        Route::get('/ppdb-periods', [PpdbSettingController::class, 'edit'])
            ->name('ppdb-periods.edit');

        Route::post('/ppdb-periods', [PpdbSettingController::class, 'update'])
            ->name('ppdb-periods.update');

        Route::get('/ppdb-content', [PpdbContentController::class, 'edit'])
            ->name('ppdb-content.edit');

        Route::post('/ppdb-content', [PpdbContentController::class, 'update'])
            ->name('ppdb-content.update');

        Route::get('/ppdb-registrations', [AdminPpdbRegistrationController::class, 'index'])
            ->name('ppdb-registrations.index');

        Route::get('/ppdb-registrations/export', [AdminPpdbRegistrationController::class, 'export'])
            ->name('ppdb-registrations.export');

        Route::get('/ppdb-registrations/export-pdf', [AdminPpdbRegistrationController::class, 'exportPdf'])
            ->name('ppdb-registrations.export-pdf');

        Route::get('/ppdb-registrations/{registration}', [AdminPpdbRegistrationController::class, 'show'])
            ->name('ppdb-registrations.show');

        Route::put('/ppdb-registrations/{registration}', [AdminPpdbRegistrationController::class, 'update'])
            ->name('ppdb-registrations.update');

        Route::delete('/ppdb-registrations/{registration}', [AdminPpdbRegistrationController::class, 'destroy'])
            ->name('ppdb-registrations.destroy');

        Route::get('/ppdb-registrations/{registration}/print', [AdminPpdbRegistrationController::class, 'print'])
            ->name('ppdb-registrations.print');

        Route::get('/students', [AdminStudentController::class, 'index'])
            ->name('students.index');

        Route::post('/students', [AdminStudentController::class, 'store'])
            ->name('students.store');

        Route::get('/students', [AdminStudentController::class, 'index'])
            ->name('students.index');

        Route::post('/students', [AdminStudentController::class, 'store'])
            ->name('students.store');

        Route::get('/students/export', [AdminStudentController::class, 'export'])
            ->name('students.export');

        Route::get('/students/import-template', [AdminStudentController::class, 'downloadImportTemplate'])
            ->name('students.import-template');

        Route::post('/students/import', [AdminStudentController::class, 'import'])
            ->name('students.import');

        Route::post('/students/{student}/generate-token', [AdminStudentController::class, 'generateToken'])
            ->name('students.generate-token');

        Route::post('/students/{student}', [AdminStudentController::class, 'update'])
            ->name('students.update');

        Route::delete('/students/{student}', [AdminStudentController::class, 'destroy'])
            ->name('students.destroy');

        Route::get('/alumni', [AdminAlumniController::class, 'index'])
            ->name('alumni.index');

        Route::post('/alumni', [AdminAlumniController::class, 'store'])
            ->name('alumni.store');

        Route::get('/alumni/export', [AdminAlumniController::class, 'export'])
            ->name('alumni.export');

        Route::get('/alumni/import-template', [AdminAlumniController::class, 'downloadImportTemplate'])
            ->name('alumni.import-template');

        Route::post('/alumni/import', [AdminAlumniController::class, 'import'])
            ->name('alumni.import');

        Route::post('/alumni/{alumni}', [AdminAlumniController::class, 'update'])
            ->name('alumni.update');

        Route::delete('/alumni/{alumni}', [AdminAlumniController::class, 'destroy'])
            ->name('alumni.destroy');

        Route::get('/osis-election', [AdminOsisElectionController::class, 'index'])
            ->name('osis-election.index');

        Route::post('/osis-election/periods', [AdminOsisElectionController::class, 'storePeriod'])
            ->name('osis-election.periods.store');

        Route::post('/osis-election/periods/{period}', [AdminOsisElectionController::class, 'updatePeriod'])
            ->name('osis-election.periods.update');

        Route::delete('/osis-election/periods/{period}', [AdminOsisElectionController::class, 'destroyPeriod'])
            ->name('osis-election.periods.destroy');

        Route::post('/osis-election/candidates', [AdminOsisElectionController::class, 'storeCandidate'])
            ->name('osis-election.candidates.store');

        Route::delete('/osis-election/candidates/{candidate}', [AdminOsisElectionController::class, 'destroyCandidate'])
            ->name('osis-election.candidates.destroy');

        Route::post('/osis-election/periods/{period}/generate-voters', [AdminOsisElectionController::class, 'generateVoters'])
            ->name('osis-election.voters.generate');

        Route::post('/osis-election/voters/{voter}/regenerate-token', [AdminOsisElectionController::class, 'regenerateVoterToken'])
            ->name('osis-election.voters.regenerate-token');

        Route::get('/osis-election/periods/{period}/export-voters', [AdminOsisElectionController::class, 'exportVoters'])
            ->name('osis-election.voters.export');

        Route::get('/osis-election/periods/{period}/export-results', [AdminOsisElectionController::class, 'exportResults'])
            ->name('osis-election.results.export');
        Route::get('/osis-election/periods/{period}/print-tokens', [AdminOsisElectionController::class, 'printTokens'])
            ->name('osis-election.voters.print-tokens');
    });