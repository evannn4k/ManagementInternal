<?php

use App\Http\Controllers\Role\ViewRoleController;
use App\Http\Controllers\Role\SyncRolePermissionController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\DeleteUserController;
use App\Http\Controllers\User\UpdateUserController;
use App\Http\Controllers\User\ViewUserController;
use Illuminate\Support\Facades\Route;

Route::inertia("/", "welcome")->name("home");

Route::middleware(["auth", "verified"])->group(function () {
    Route::inertia("dashboard", "dashboard")->name("dashboard");

    Route::prefix("/user")
        ->name("user.")
        ->group(function () {
            Route::get("/", [ViewUserController::class, "index"])->name(
                "index",
            )->middleware("can:user.view");
            Route::post("/", CreateUserController::class)->name("create")->middleware("can:user.create");

            Route::put("/{user}", UpdateUserController::class)->name("update")->middleware("can:user.update");
            Route::delete("/{user}", DeleteUserController::class)->name(
                "delete",
            )->middleware("can:user.delete");
        });

    Route::prefix("/role")
        ->name("role.")
        ->middleware("can:role.manage")
        ->group(function () {
            Route::get("/", [ViewRoleController::class, "index"])->name(
                "index",
            );

            Route::put("/sync/permission/{role}", SyncRolePermissionController::class)->name(
                "sync",
            );
        });
    
        Route::prefix("/user")
        ->name("user.")
        ->group(function () {
            Route::get("/", [ViewUserController::class, "index"])->name(
                "index",
            )->middleware("can:user.view");
            Route::post("/", CreateUserController::class)->name("create")->middleware("can:user.create");

            Route::put("/{user}", UpdateUserController::class)->name("update")->middleware("can:user.update");
            Route::delete("/{user}", DeleteUserController::class)->name(
                "delete",
            )->middleware("can:user.delete");
        });
});

require __DIR__ . "/settings.php";
