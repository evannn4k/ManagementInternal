<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\ChangeStatusTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChangeStatusTaskController extends Controller
{
    public function __invoke(ChangeStatusTaskRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($credentials) {
                $tasks = Task::whereIn("id", array_map(function ($t) {
                    return $t["task_id"];
                }, $credentials['task']))->get();

                foreach ($tasks as $task) {
                    $task->status_id = array_find($credentials['task'], function ($t) use ($task) {
                        return $t["task_id"] == $task->id;
                    })["status_id"];

                    $task->save();
                }
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengganti status tugas");
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
