<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
                $statuses = $credentials['status'] ?? [];

                unset($credentials['teams'], $credentials['status']);

                $project->update($credentials);

                $existingStatuses = Status::where('project_id', $project->id)->get()->pluck("name")->toArray();

                $diffStatus = array_diff($existingStatuses, $statuses);
                if (!empty($diffStatus)) {
                    Status::where("project_id", $project->id)->whereIn("name", $diffStatus)->delete();
                }

                foreach ($statuses as $index => $status) {
                    Status::updateOrCreate(
                        ['project_id' => $project->id, "name" => $status],
                        ["position" => $index]
                    );
                }

                $project->teams()->sync($teams);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengubah data proyek.");
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
