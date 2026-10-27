<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubTask\CreateSubTaskRequest;
use App\Models\SubTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CreateSubTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateSubTaskRequest $request, Task $task)
    {
        $credentials = $request->validated();

        try {
            $credentials["task_id"] = $task->id;

            SubTask::create($credentials);

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah subtugas.");
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
