<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\PitchdeckController;
use App\Http\Controllers\AirdropController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PaymentAddressController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/airdrop', [AirdropController::class, 'index'])->name('airdrop');
    Route::get('/pitchdecks', [PitchdeckController::class, 'index'])->name('pitchdecks');
    Route::get('/adminpanel', [AdminPanelController::class, 'index'])->name('adminpanel');
    Route::get('/reports', [ReportController::class, 'index'])->name('reports');
    Route::get('/plans', [PlanController::class, 'index'])->name('plans');
    Route::get('/paymentaddress', [PaymentAddressController::class, 'index'])->name('paymentaddress');
    // Projects
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::post('/add_project', [ProjectController::class, 'store'])->name('add_project');
    Route::post('/updata_project', [ProjectController::class, 'updata'])->name('updata_project');
    Route::post('/delete_project', [ProjectController::class, 'delete'])->name('delete_project');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
