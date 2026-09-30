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
        $data = ProjectTableResource::collection(Project::with("teams:id,name,position", "pic:id,name", "createdBy:id,name")->paginate(10));
        $users =  User::select("id", "name", "position")->with('roles:id,name')->where("is_active", true)->get();

        return Inertia::render(
            "project/page",
            compact("data", "users"),
        );
    }

    public function detail(Project $project)
    {
        $project->load("pic:id,name,position", "pic.roles:id,name", "teams", "statuses", "statuses.tasks", "createdBy");

        return Inertia::render(
            "project/detail",
            compact("project"),
        );
    }
}
