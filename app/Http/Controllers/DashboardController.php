<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\DashboardTaskOverdueResource;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Faker\Provider\Lorem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        /** @var User $user */

        $user = Auth::user();
        $now = now();

        $counts = $user
            ->tasks()
            ->toBase()
            ->join("statuses", "tasks.status_id", "=", "statuses.id")
            ->selectRaw(
                "
                    COUNT(CASE WHEN statuses.type = 'pending' THEN 1 END) as total_pending,
                    COUNT(CASE WHEN statuses.type = 'running' THEN 1 END) as total_running,
                    COUNT(CASE WHEN statuses.type = 'completed' THEN 1 END) as total_completed,
                    COUNT(CASE WHEN tasks.due_date < ? AND statuses.type != 'completed' THEN 1 END) as total_overdue
                ",
                [$now],
            )
            ->first();

        $cardData = [
            "total_pending" => $counts->total_pending ?? 0,
            "total_running" => $counts->total_running ?? 0,
            "total_overdue" => $counts->total_overdue ?? 0,
            "total_completed" => $counts->total_completed ?? 0,
        ];

        $cardMasterData = [
            "total_active_user" => 0,
            "total_running_task" => 0,
            "total_running_project" => 0,
            "total_due_project" => 0,
        ];

        $overdue = $user
            ->tasks()
            ->with("status")
            ->where("due_date", "<", $now)
            ->whereHas("status", fn($q) => $q->where("type", "!=", "completed"))
            ->limit(4)
            ->get();

        $pending = $user
            ->tasks()
            ->whereHas("status", function ($query) {
                return $query->where("type", "pending");
            })
            ->limit(4)
            ->get();

        $thisWeek = $user
            ->tasks()
            ->whereHas("status", function ($query) {
                return $query
                    ->where("due_date", ">=", Carbon::now())
                    ->where("due_date", "<", Carbon::now()->addWeek());
            })
            ->limit(4)
            ->get();

        $summaryTask = [
            "overdue" => $overdue,
            "thisWeek" => $thisWeek,
            "pending" => $pending,
        ];

        $summaryData = [
            "statusDistribution" => [],
            "assignedDistribution" => [],
            "overdueTasks" => [],
        ];

        if ($user->can("dashboard.view.project")) {
            $statusDistribution = [
                "pending" => 0,
                "running" => 0,
                "completed" => 0,
                "canceled" => 0,
            ];

            $statusDistribution = Status::withCount("tasks")
                ->get()
                ->groupBy("type")
                ->map->sum("tasks_count")
                ->toArray();

            $assignedDistribution = User::select("id", "name")
                ->withCount("tasks")
                ->orderByDesc("tasks_count")
                ->limit(5)
                ->get();

            $tasks = Task::select("title", "due_date")
                ->where("due_date", "<", now())
                ->paginate(5)
                ->withQueryString();

            $overdueTasks = DashboardTaskOverdueResource::collection($tasks);

            $summaryData = [
                "statusDistribution" => $statusDistribution,
                "assignedDistribution" => $assignedDistribution,
                "overdueTasks" => $overdueTasks,
            ];
        }

        if ($user->can("dashboard.view.sistem")) {
            $totalActiveUser = User::where("is_active", true)->count();
            $totalRunningTask = Task::whereHas(
                "status",
                fn($query) => $query->where("type", "running"),
            )->count();
            
            $projectData = Project::selectRaw(
                "
                    COUNT(CASE WHEN status = 'running' THEN 1 END) as total_running_project,
                    COUNT(CASE WHEN end_date < ? THEN 1 END) as total_due_project
                ",
                [$now],
            )
                ->first()
                ->toArray();

            $cardMasterData = array_merge(
                [
                    "total_active_user" => $totalActiveUser,
                    "total_running_task" => $totalRunningTask,
                ],
                $projectData,
            );

            // dd($cardMasterData);
        }

        return Inertia::render(
            "dashboard/page",
            compact("cardData", "cardMasterData", "summaryTask", "summaryData"),
        );
    }
}
