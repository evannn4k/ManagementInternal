<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UpdateProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateProjectRequest $request, Project $project)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($credentials, $project) {
                $teams = $credentials['teams'] ?? [];
                $statuses = $credentials['statuses'] ?? [];

                unset($credentials['teams'], $credentials['statuses']);

                $project->update($credentials);

                $existingStatuses = Status::where('project_id', $project->id)->get()->pluck("name")->toArray();

                $diffStatus = array_diff($existingStatuses, array_column($statuses, "name"));

                if (!empty($diffStatus)) {
                    $deletedStatuses = Status::where("project_id", $project->id)->whereIn("name", $diffStatus);

                    if ((clone $deletedStatuses)->whereHas('tasks')->exists()) {
                        throw ValidationException::withMessages([
                            'status' => 'Status memiliki tugas terkait.'
                        ]);
                    }

                    $deletedStatuses->delete();
                }

                foreach ($statuses as $index => $status) {
                    Status::updateOrCreate(
                        ['project_id' => $project->id, "name" => $status['name']],
                        ["position" => $index, "type" => $status['type']]
                    );
                }

                $statusIds = $project->statuses->pluck("id")->toArray();
                $oldTeams = $project->teams()->get()->pluck('id')->toArray();
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

                $project->teams()->sync($teams);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengubah data proyek.");
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
