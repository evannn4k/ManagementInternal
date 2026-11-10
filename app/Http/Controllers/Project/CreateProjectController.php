<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Jobs\SendTelegramNotification;
use App\Models\Project;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateProjectRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($request, $credentials) {
                $teams = $credentials['teams'] ?? [];
                $statuses = $credentials['statuses'] ?? [];

                unset($credentials['teams'], $credentials['statuses']);

                $credentials['created_by'] = $request->user()->id;

                $project = Project::create($credentials);

                foreach ($statuses as $index => $status) {
                    Status::create(['project_id' => $project->id, "name" => $status['name'], "type" => $status['type'], "position" => $index]);
                }

                $project->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "new_data" => $project,
                    "ip_address" => $request->ip(),
                ]);

                $newTeamChatIds = User::select("telegram_chat_id")->whereIn("id", $teams)->get()->pluck("telegram_chat_id")->toArray();

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
