<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserTableResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewUserController extends Controller
{
    function index(Request $request)
    {
        $users = User::paginate($request->per_page ?? 10)->withQueryString();

        $data = UserTableResource::collection($users);

        return Inertia::render("user/page", compact("data"));
    }
}
