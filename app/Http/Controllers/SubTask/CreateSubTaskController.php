<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubTask\CreateSubTaskRequest;
use App\Models\SubTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            DB::transaction(function () use ($credentials, $request, $task) {
                $credentials["task_id"] = $task->id;

                $subTask = SubTask::create($credentials);

                $project = $subTask->task->project;

                $subTask->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "create",
                    "parent_type" => class_basename($project),
                    "parent_id" => $project->id,
                    "new_data" => $subTask->only(),
                    "ip_address" => $request->ip(),
                ]);
            });

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
