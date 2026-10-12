<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateTeamProjectRequest;
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
