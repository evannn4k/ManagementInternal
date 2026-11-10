<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Resources\Activity\ActivityTableResource;
use App\Http\Resources\Project\ProjectTableResource;
use App\Http\Resources\Task\TaskTableResource;
use App\Models\Activity;
use App\Models\Project;
use App\Models\Status;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ViewProjectController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    function index(Request $request)
    {
        $projects = Project::with([
            "statuses" => fn($q) => $q->orderBy('position', 'asc')->withCount('tasks as total_task'),
            "teams:id,name,position",
            "pic:id,name",
            "createdBy:id,name"
        ])
            ->withCount('tasks as total_task')
            ->when($request->search, function ($query, $value) {
                $query
                    ->where("name", "ilike", "%$value%");
            })->when($request->status, function ($query, $value) {
                $query->where("status", $value);
            }, function ($query) {
                $query->where("status", "!=", "archived");
            })->when($request->priority, function ($query, $value) {
                $query
                    ->where("priority", $value);
            });

        $projectsPagination = $projects->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = ProjectTableResource::collection($projectsPagination);
        $users =  User::select("id", "name", "position")->with('roles:id,name')->where("is_active", true)->get();

        $cardData = [
            "total_total" => $projects->count(),
            "total_running" => $projects->where("status", "running")->count(),
            "total_overdue" => $projects->where("end_date", "<", now())->count(),
            "total_completed" => $projects->where("status", "done")->count(),
        ];

        return Inertia::render(
            "project/page",
            compact("data", "users", "cardData"),
        );
    }

    public function detail(Request $request, Project $project)
    {
        $project->load(
            [
                "pic:id,name,position",
                "pic.roles:id,name",
                "teams:id,name,position",
                "teams.roles:id,name",
                "statuses" => function ($query) {
                    return $query->orderBy('position', 'asc');
                },
                "statuses.tasks" => function ($query) use ($request) {
                    return $query->when($request->search, function ($q, $value) {
                        return $q->where("title", "ilike", "%$value%");
                    })->when($request->priority, function ($q, $value) {
                        return $q->where("priority", $value);
                    })->when($request->team, function ($q, $value) {
                        return $q->whereHas("assigned", function ($t) use ($value) {
                            return $t->where("name", "ilike", "%$value%");
                        });
                    })->when($request->task_view, function ($q, $value) {
                        if ($value != "own") return $q;

                        return $q->whereHas("assigned", function ($t) {
                            $id = $this->user->id;
                            return $t->where("id", $id);
                        });
                    });
                },
                "statuses.tasks.assigned:id,name,position",
                "createdBy"
            ]
        );

        return Inertia::render(
            "project/detail",
            compact("project"),
        );
    }

    public function detailTeam(Request $request, Project $project)
    {
        $project->load(
            [
                "pic:id,name,position",
                "pic.roles:id,name",
                "teams:id,name,position",
                "teams.roles:id,name",
                "statuses" => function ($query) {
                    return $query->orderBy('position', 'asc');
                },
                "statuses.tasks" => function ($query) use ($request) {
                    return $query->when($request->search, function ($q, $value) {
                        return $q->where("title", "ilike", "%$value%");
                    })->when($request->priority, function ($q, $value) {
                        return $q->where("priority", $value);
                    })->when($request->team, function ($q, $value) {
                        return $q->whereHas("assigned", function ($t) use ($value) {
                            return $t->where("name", "ilike", "%$value%");
                        });
                    })->when($request->task_view, function ($q, $value) {
                        if ($value != "own") return $q;

                        return $q->whereHas("assigned", function ($t) {
                            $id = $this->user->id;
                            return $t->where("id", $id);
                        });
                    });
                },
                "statuses.tasks.assigned:id,name,position",
                "createdBy"
            ]
        );

        $users = User::select("id", "name", "position")->get();

        return Inertia::render(
            "project/detail-team",
            compact("project", "users"),
        );
    }

    public function detailActivity(Request $request, Project $project)
    {
        $project->load(
            [
                "pic:id,name,position",
                "pic.roles:id,name",
                "teams:id,name,position",
                "teams.roles:id,name",
                "createdBy"
            ]
        );

        $activities = Activity::with([
            "user:id,name",
            "subject"
        ])->where(function ($query) use ($project) {
            $query->where("subject_id", $project->id)->orWhere("parent_id", $project->id);
        })
            ->when($request->search, function ($query, $value) {
                $query->whereHas("user", function ($q) use ($value) {
                    return $q->where("name", "ilike", "%$value%");
                });
            })->when($request->type, function ($query, $value) {
                $query
                    ->where("type", $value);
            })->when($request->date_from, function ($query, $value) {
                $query
                    ->where("created_at", ">=", $value);
            })->when($request->date_to, function ($query, $value) {
                $query
                    ->where("created_at", "<=", $value);
            })->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = ActivityTableResource::collection($activities);

        return Inertia::render(
            "project/detail-activity",
            compact("project", "data"),
        );
    }

    public function detailTrashed(Request $request, Project $project)
    {
        $project->load(
            [
                "pic:id,name,position",
                "pic.roles:id,name",
                "teams:id,name,position",
                "teams.roles:id,name",
                "createdBy"
            ]
        );

        $tasks = TaskTableResource::collection($project
            ->tasks()
            ->with(
                "status:id,name,project_id",
            )->onlyTrashed()
            ->when($request->search, function ($query, $value) {
                $query
                    ->where("title", "ilike", "%$value%");
            })->when($request->priority, function ($query, $value) {
                $query
                    ->where("priority", $value);
            })->when($request->task_view, function ($q, $value) {
                if ($value != "own") return $q;

                return $q->own($this->user);
            })->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString());

        return Inertia::render(
            "project/detail-trashed",
            compact("project", "tasks"),
        );
    }
}
