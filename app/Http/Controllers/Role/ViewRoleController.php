<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\Role\RoleResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ViewRoleController extends Controller
{
    function index(Request $request)
    {
        $roleData = Role::orderBy("is_system", "desc")->get();
        $roles = RoleResource::collection($roleData);
        $permissions = Permission::all()->groupBy('resource')
            ->map(function ($p) {
                return $p->groupBy('action');
            });


        return Inertia::render("role/page", compact("roles", "permissions"));
    }
}
