<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubTask\UpdateSubTaskRequest;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UpdateSubTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateSubTaskRequest $request, SubTask $subTask)
    {
        $credentials = $request->validated();
        try {
            $subTask->is_completed = $credentials["status"];

            $subTask->save();

            return redirect()
                ->back();
        } catch (\Exception $e) {
            Log::error("Error : " . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    "error",
                    "terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
