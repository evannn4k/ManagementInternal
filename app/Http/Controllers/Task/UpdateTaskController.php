<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Activity;
use App\Models\Task;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateTaskRequest $request, Task $task)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($request, $credentials, $task) {
                $newAssigned = $credentials['assigned'] ? $credentials['assigned'] : [];
                $oldAssigned = $task->assigned()->pluck("id")->toArray();

                $newLabel = $credentials['label'] ?? [];
                $oldLabel = $task->label ?? [];

                $diffCredentials = $credentials;

                unset($credentials['assigned']);
                unset($diffCredentials['label'], $diffCredentials['assigned']);

                if ($request->hasFile('file')) {
                    $filename = FileService::save("task/", $request->file("file"), $task->file);

                    $credentials['file'] = $filename;
                } else {
                    unset($credentials['file']);
                }

                // pengecekan perubahan
                $addedLabel = array_values(array_diff($newLabel, $oldLabel));
                $removedLabel = array_values(array_diff($oldLabel, $newLabel));

                $addedAssigned = array_values(array_diff($newAssigned, $oldAssigned));
                $removedAssigned = array_values(array_diff($oldAssigned, $newAssigned));

                $diffData = array_diff_assoc($diffCredentials, $task->only(array_keys($diffCredentials)));
                $oldData = $task->only(array_keys($diffData));

                if ($addedLabel || $removedLabel) {
                    $diffData["label"] = $credentials["label"];
                }

                if ($addedAssigned || ($removedAssigned && !empty($diffCredentials["assigned"]))) {
                    $diffData["assigned"] = $newAssigned;
                    $oldData["assigned"] = $oldAssigned;
                }

                $task->update($credentials);

                $task->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => $oldData,
                    "new_data" => $diffData,
                    "ip_address" => $request->ip(),
                ]);

                $task->assigned()->sync($newAssigned);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil memperbarui data tugas.");
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
