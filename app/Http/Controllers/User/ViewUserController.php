<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserTableResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class ViewUserController extends Controller
{
    function index(Request $request)
    {
        $users = User::when($request->search, function ($query, $value) {
            $query
                ->where("name", "like", "%$value%")
                ->orWhere("email", "like", "%$value%");
        })
            ->when($request->role, function ($query, $value) {
                $query->whereHas("roles", function ($q) use ($value) {
                    $q->where("name", $value);
                });
            })
            ->when($request->is_active, function ($query, $value) {
                $query->where("is_active", $value == "aktif");
            })
            ->orderBy("created_at", "desc")
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        $data = UserTableResource::collection($users);
        $cardData = [
            "total_account" => User::count(),
            "total_active" => User::where("is_active", 1)->count(),
            "total_nonactive" => User::where("is_active", 0)->count(),
            "total_admin" => User::role("admin")->count(),
        ];
        $roles = Role::select("id", "name")->get();

        return Inertia::render(
            "user/page",
            compact("data", "cardData", "roles"),
        );
    }
}
