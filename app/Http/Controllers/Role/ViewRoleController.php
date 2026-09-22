<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ViewRoleController extends Controller
{
    function index(Request $request)
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render("role/page", compact("roles", "permissions"));
    }
}
