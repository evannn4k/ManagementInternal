<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateTeamProjectRequest;
use App\Jobs\SendTelegramNotification;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UpdateTeamProjectController extends Controller
{
    public function __invoke(UpdateTeamProjectRequest $request, Project $project)
    {
        $credentials = $request->validated();

        try {

            DB::transaction(function () use ($credentials, $project) {
                $teams = $credentials['teams'] ?? [];

                $statusIds = $project->statuses->pluck("id")->toArray();

                $oldTeams = $project->teams()->get()->pluck('id')->toArray();
                $addedTeams = array_diff($teams, $oldTeams);

                $deletedTeamIds = array_diff($oldTeams, $teams);

                if (!empty($deletedTeamIds)) {
                    $hasTask = User::whereIn("id", $deletedTeamIds)->whereHas("tasks", function ($query) use ($statusIds) {
                        return $query->whereIn("status_id", $statusIds);
                    })->exists();

                    if ($hasTask) {
                        throw ValidationException::withMessages([
                            'teams' => 'Anggota tim memiliki tugas terkait.'
                        ]);
                    }
                }

                $newTeamChatIds = User::select("telegram_chat_id")->whereIn("id", $addedTeams)->get()->pluck("telegram_chat_id")->toArray();

                if ($newTeamChatIds) {
                    $projectUrl = route("project.detail", $project->id);

                    $message = "Anda ditugaskan pada proyek : <b>" . $project->name . "</b>\n\n" .
                        'Link : <a href="' . $projectUrl . '">Klik Disini</a>';

                    foreach ($newTeamChatIds as $chatId) {
                        if ($chatId) {
                            SendTelegramNotification::dispatch($chatId, $message, ["parse_mode" => "HTML"]);
                        }
                    }
                }

                $project->teams()->sync($teams);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengubah team proyek.");
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error("Error : " . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    "error",
                    "Terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
