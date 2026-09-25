<?php

use App\Http\Controllers\Project\CreateProjectController;
use App\Http\Controllers\Project\DeleteProjectController;
use App\Http\Controllers\Project\UpdateProjectController;
use App\Http\Controllers\Project\ViewProjectController;
use App\Http\Controllers\Role\SyncRolePermissionController;
use App\Http\Controllers\Role\ViewRoleController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\DeleteUserController;
use App\Http\Controllers\User\UpdateUserController;
use App\Http\Controllers\User\ViewUserController;
use Illuminate\Support\Facades\Route;

Route::inertia("/", "welcome")->name("home");

Route::middleware(["auth", "verified"])->group(function () {
    Route::inertia("dashboard", "dashboard")->name("dashboard");

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

            Route::put("/{user}", UpdateUserController::class)->name("update")->middleware("can:user.edit");
            Route::delete("/{user}", DeleteUserController::class)->name(
                "delete",
            )->middleware("can:user.delete");
        });

    Route::prefix("/project")
        ->name("project.")
        ->group(function () {
            Route::get("/", [ViewProjectController::class, "index"])->name(
                "index",
            )->middleware("permission:project.view.own|project.view.team|project.view.all");
            Route::post("/", CreateProjectController::class)->name("create")->middleware("can:project.create");

            Route::put("/{project}", UpdateProjectController::class)->name("update")->middleware("can:project.update");
            Route::delete("/{project}", DeleteProjectController::class)->name(
                "delete",
            )->middleware("can:project.delete");
        });
});

require __DIR__ . "/settings.php";
