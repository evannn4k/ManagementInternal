<?php

namespace App\Http\Controllers\Activity;

use App\Http\Resources\Activity\ActivityTableResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;

class ViewActivityController extends Controller
{
    public function index(Request $request)
    {
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
