<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Jobs\SendTelegramNotification;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use App\Services\FileService;
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

                $task->update($credentials);

                $project = Status::find($task->status_id)->project->select("id")->first();

                if ($addedAssigned || $removedAssigned) {
                    $diffData["assigned"] = $newAssigned;
                    $oldData["assigned"] = $oldAssigned;

                    $newAssignedChatIds = User::select("telegram_chat_id")->whereIn("id", $addedAssigned)->get()->pluck("telegram_chat_id")->toArray();

                    if ($newAssignedChatIds) {
                        $taskUrl = route("task.detail", $task->id);

                        $message = "Anda ditugaskan pada tugas : <b>" . $task->title . "</b>\n\n" .
                            'Link : <a href="' . $taskUrl . '">Klik Disini</a>';

                        foreach ($newAssignedChatIds as $chatId) {
                            if ($chatId) {
                                SendTelegramNotification::dispatch($chatId, $message, ["parse_mode" => "HTML"]);
                            }
                        }
                    }
                }

                $task->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "parent_type" => class_basename($project),
                    "parent_id" => $project->id,
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
