<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewTaskController extends Controller
{
    function index(Request $request) {}

    public function detail(Task $task)
    {
        $task->load([
            "status.project.statuses",
            "assigned:id,name,position",
        ]);

        return Inertia::render(
            "task/detail",
            compact("task"),
        );
    }
}
