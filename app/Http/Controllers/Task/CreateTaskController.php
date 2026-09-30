<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Models\Task;
use App\Services\FileService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateTaskController extends Controller
{
    public function __invoke(CreateTaskRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($request, $credentials) {
                $assigned = $credentials['assigned'] ?? [];

                unset($credentials['assigned']);

                if ($credentials['file']) {

                    $filename = FileService::save("task/", $request->file("file"));

                    $credentials['file'] = $filename;
                } else {
                    unset($credentials['file']);
                }

                $task = Task::create($credentials);

                $task->assigned()->sync($assigned);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah data proyek baru.");
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
