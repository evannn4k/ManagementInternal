<?php

namespace App\Http\Controllers\Activity;

use App\Http\Controllers\Controller;
use App\Http\Resources\Activity\ActivityTableResource;
use App\Models\Activity;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ViewActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::with([
            "user:id,name",
            "subject"
        ])->orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = ActivityTableResource::collection($activities);

        $counts = DB::table('activities')
            ->selectRaw("
                COUNT(*) as total_activity,
                COUNT(CASE WHEN type = 'create' THEN 1 END) as total_create,
                COUNT(CASE WHEN type = 'update' THEN 1 END) as total_update,
                COUNT(CASE WHEN type = 'delete' THEN 1 END) as total_delete
            ")
            ->first();

        $cardData = [
            "total_activity" => $counts->total_activity,
            "total_create" => $counts->total_create,
            "total_update" => $counts->total_update,
            "total_delete" => $counts->total_delete,
        ];

        return Inertia::render("activity/page", compact("data", "cardData"));
    }
}
