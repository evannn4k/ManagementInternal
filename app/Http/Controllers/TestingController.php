<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function deleteActivity(Activity $activity)
    {
        $activity->delete();

        return redirect()->back()->with("success", "berhasil");
    }
}
