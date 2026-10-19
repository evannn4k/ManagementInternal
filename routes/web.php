<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Project\CreateProjectController;
use App\Http\Controllers\Project\DeleteProjectController;
use App\Http\Controllers\Project\DeleteStatusProjectController;
use App\Http\Controllers\Project\UpdateProjectController;
use App\Http\Controllers\Project\UpdateStatusProjectController;
use App\Http\Controllers\Project\UpdateTeamProjectController;
use App\Http\Controllers\Project\ViewProjectController;
use App\Http\Controllers\Role\CreateRoleController;
use App\Http\Controllers\Role\DeleteRoleController;
use App\Http\Controllers\Role\SyncRolePermissionController;
use App\Http\Controllers\Role\UpdateRoleController;
use App\Http\Controllers\Role\ViewRoleController;
use App\Http\Controllers\Task\ChangeStatusTaskController;
use App\Http\Controllers\Task\CreateTaskController;
use App\Http\Controllers\Task\DeleteTaskController;
use App\Http\Controllers\Task\UpdateTaskController;
use App\Http\Controllers\Task\ViewTaskController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\DeleteUserController;
use App\Http\Controllers\User\UpdateUserController;
use App\Http\Controllers\User\ViewUserController;
use Illuminate\Support\Facades\Route;

Route::inertia("/", "welcome")->name("home");

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/dashboard", DashboardController::class)->name("dashboard")->middleware("permission:dashboard.view.personal|dashboard.view.project|dashboard.view.sistem");

    Route::prefix("/role")
        ->name("role.")
        ->middleware("can:role.manage")
        ->group(function () {
            Route::get("/", [ViewRoleController::class, "index"])->name(
                "index",
            );

            Route::post("/", CreateRoleController::class)->name("create");
            Route::put("/{role}", UpdateRoleController::class)->name("update");
            Route::delete("/{role}", DeleteRoleController::class)->name(
                "delete",
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
            
            Route::get("/{user}", [ViewUserController::class, "detail"])->name(
                "detail",
            )->middleware("can:user.view");
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
            )->middleware("permission:project.view.own|project.view.all");
            Route::post("/", CreateProjectController::class)->name("create")->middleware("can:project.create");

            Route::get("/{project}", [ViewProjectController::class, "detail"])->name(
                "detail",
            )->middleware("permission:project.view.own|project.view.team|project.view.all");
            Route::put("/{project}", UpdateProjectController::class)->name("update")->middleware("can:project.edit");
            Route::delete("/{project}", DeleteProjectController::class)->name(
                "delete",
            )->middleware("can:project.delete");

            Route::put("/team/{project}", UpdateTeamProjectController::class)->name("team.update")->middleware("can:project.edit");
            Route::put("/status/{status}", UpdateStatusProjectController::class)->name("status.update")->middleware("can:project.edit");
            Route::delete("/status/{status}", DeleteStatusProjectController::class)->name("status.delete")->middleware("can:project.edit");
        });

    Route::prefix("/task")
        ->name("task.")
        ->group(function () {

            Route::get("/", [ViewTaskController::class, "index"])->name(
                "index",
            )->middleware("permission:task.view.all|task.view.own");

            Route::post("/", CreateTaskController::class)->name("create")->middleware("can:task.create");
            Route::put("/change-status", ChangeStatusTaskController::class)->name("change.status");

            Route::get("/{task}", [ViewTaskController::class, "detail"])->name(
                "detail",
            )->middleware("permission:task.view.all|task.view.own");
            Route::put("/{task}", UpdateTaskController::class)->name("update")->middleware("can:task.edit");
            Route::delete("/{task}", DeleteTaskController::class)->name(
                "delete",
            )->middleware("can:task.delete");
        });
});

require __DIR__ . "/settings.php";
