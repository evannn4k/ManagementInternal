<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            DB::transaction(function () use ($credentials, $project, $request) {
                $teams = $credentials['teams'] ?? [];
                $statuses = $credentials['statuses'] ?? [];

                unset($credentials['teams'], $credentials['statuses']);

                $oldProject = clone $project;
                $project->update($credentials);

                $diffData = array_diff_assoc($credentials, $oldProject->only(array_keys($credentials)));
                $oldData = $oldProject->only(array_keys($diffData));

                $existingStatuses = Status::where('project_id', $project->id)->select(["name", "type"])->get();
                $existingStatusesName = $existingStatuses->pluck("name")->toArray();

                $diffStatus = array_diff($existingStatusesName, array_column($statuses, "name"));
                $newStatus = array_diff(array_column($statuses, "name"), $existingStatusesName);

                if (!empty($diffStatus)) {
                    $deletedStatuses = Status::where("project_id", $project->id)->whereIn("name", $diffStatus);

                    if ((clone $deletedStatuses)->whereHas('tasks')->exists()) {
                        throw ValidationException::withMessages([
                            'statuses' => 'Status memiliki tugas terkait.'
                        ]);
                    }

                    $deletedStatuses->delete();
                }

                if ($newStatus || $diffStatus) {
                    $diffData["statuses"] = $statuses;
                    $oldData["statuses"] = $existingStatuses;
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

                if ($deletedTeamIds) {
                    $diffData["teams"] = $deletedTeamIds;
                    $oldData["teams"] = $oldTeams;
                }

                $project->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => $oldData,
                    "new_data" => $diffData,
                    "ip_address" => $request->ip(),
                ]);

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
