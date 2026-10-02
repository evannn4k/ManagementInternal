<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Resources\Project\ProjectTableResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
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
                ->where("name", "like", "%$value%");
        })->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = ProjectTableResource::collection($projects);
        $users =  User::select("id", "name", "position")->with('roles:id,name')->where("is_active", true)->get();

        return Inertia::render(
            "project/page",
            compact("data", "users"),
        );
    }

    public function detail(Project $project)
    {
        $project->load(
            [
                "pic:id,name,position",
                "pic.roles:id,name",
                "teams",
                "statuses" => fn($q) => $q->orderBy('position', 'asc'),
                "statuses.tasks.assigned:id,name,position",
                "createdBy"
            ]
        );

        return Inertia::render(
            "project/detail",
            compact("project"),
        );
    }
}
