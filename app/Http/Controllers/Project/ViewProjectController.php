<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Resources\Activity\ActivityTableResource;
use App\Http\Resources\Project\ProjectTableResource;
use App\Models\Activity;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ViewProjectController extends Controller
{
    function index(Request $request)
    {
        $projects = Project::with([
            "statuses" => fn($q) => $q->orderBy('position', 'asc'),
            "teams:id,name,position",
            "pic:id,name",
            "createdBy:id,name"
        ])->when($request->search, function ($query, $value) {
            $query
                ->where("name", "ilike", "%$value%");
        })->when($request->status, function ($query, $value) {
            $query
                ->where("status", $value);
        })->when($request->priority, function ($query, $value) {
            $query
                ->where("priority", $value);
        })->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = ProjectTableResource::collection($projects);
        $users =  User::select("id", "name", "position")->with('roles:id,name')->where("is_active", true)->get();
        $cardData = [
            "total_total" => Project::count(),
            "total_running" => Project::where("status", "running")->count(),
            "total_overdue" => Project::where("end_date", "<", now())->count(),
            "total_completed" => Project::where("status", "done")->count(),
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
                            $id = Auth::user()->id;
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
                            $id = Auth::user()->id;
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
        ])->when($request->search, function ($query, $value) {
            $query->whereHas("user", function ($q) use ($value) {
                return $q->where("name", "ilike", "%$value%");
            });
        })->when($request->type, function ($query, $value) {
            $query
                ->where("type", $value);
        })->when($request->table, function ($query, $value) {
            $query
                ->where("subject_type", "ilike", "%$value");
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
}
