<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Services\FileService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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

                $teamIds = Project::whereHas("statuses", function ($query) use ($credentials) {
                    return $query->where("id", $credentials['status_id']);
                })->first()->teams()->pluck("id")->toArray();

                $diffTeam = array_diff($assigned, $teamIds);

                if ($diffTeam) {
                    throw ValidationException::withMessages([
                        'assigned' => 'Anggota tim tidak valid.'
                    ]);
                }

                $task = Task::create($credentials);

                $task->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "create",
                    "new_data" => $task,
                    "ip_address" => $request->ip(),
                ]);

                $task->assigned()->sync($assigned);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah data tugas baru.");
        } catch (ValidationException $e) {
            throw $e;
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
