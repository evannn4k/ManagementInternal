<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskTableResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ViewTaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::with(["status:id,name,project_id", "status.project:id,name"])
            ->when($request->search, function ($query, $value) {
                $query
                    ->where("title", "ilike", "%$value%");
            })->when($request->project, function ($query, $value) {
                $query
                    ->whereHas("status.project", function ($q) use ($value) {
                        return $q->where("name", $value);
                    });
            })->when($request->tabs, function ($query, $value) {
                if ($value == "due") {
                    return $query->where("due_date", "<=", now()->toDateString());
                } else if ($value == "this_week") {
                    return $query->where("due_date", "<=", now()->addWeek()->toDateString());
                } else {
                    return $query;
                }
            })->when($request->priority, function ($query, $value) {
                $query
                    ->where("priority", $value);
            })->when($request->task_view, function ($q, $value) {
                if ($value != "own") return $q;

                return $q->whereHas("assigned", function ($t) {
                    $id = Auth::user()->id;
                    return $t->where("id", $id);
                });
            })->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = TaskTableResource::collection($tasks);

        $projects = Project::with("defaultStatus")->select("id", "name")->get();

        $user = User::find(Auth::user()->id);

        $cardData = [
            "total_pending" => $user->tasks()->whereHas("status", function ($query) {
                return $query->where("type", "pending");
            })->count(),
            "total_running" => $user->tasks()->whereHas("status", function ($query) {
                return $query->where("due_date", "<", now());
            })->count(),
            "total_overdue" => $user->tasks()->whereHas("status", function ($query) {
                return $query->where("due_date", "<", now());
            })->count(),
            "total_task" => $user->tasks()->count(),
        ];

        return Inertia::render(
            "task/page",
            compact("data", "projects", "cardData"),
        );
    }
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
