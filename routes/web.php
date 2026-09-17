<?php

use App\Http\Controllers\User\ViewUserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix("/user")->name("user.")->group(function () {
        Route::get("/", [ViewUserController::class, "index"])->name("index");
    });
});

require __DIR__ . '/settings.php';
