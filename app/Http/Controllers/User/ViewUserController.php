<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewUserController extends Controller
{
    function index()
    {
        return Inertia::render("user/page");
    }
}
