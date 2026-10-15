<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $user = User::find(Auth::user()->id);
        $taskOverdue = $user->tasks()->whereHas("status", function ($query) {
            return $query->where("due_date", "<", now());
        });
        $taskPending = $user->tasks()->whereHas("status", function ($query) {
            return $query->where("type", "pending");
        });

        $cardData = [
            "total_pending" => $taskPending->count(),
            "total_running" => $taskOverdue->count(),
            "total_overdue" => $user->tasks()->whereHas("status", function ($query) {
                return $query->where("due_date", "<", now());
            })->count(),
            "total_completed" => $user->tasks()->whereHas("status", function ($query) {
                return $query->where("type", "completed");
            })->count(),
        ];

        $overdue = $taskOverdue->limit(4)->get();
        $thisWeek = $user->tasks()->whereHas("status", function ($query) {
            return $query->where("due_date", ">=", Carbon::now())->where("due_date", "<", Carbon::now()->addWeek());
        })->limit(4)->get();
        $pending = $taskPending->limit(4)->get();


        return Inertia::render("dashboard/page", compact("cardData", "overdue", "thisWeek", "pending"));
    }
}
