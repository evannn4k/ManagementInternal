<?php

namespace App\Http\Controllers\Project\Sprint;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Sprint\CreateSprintRequest;
use App\Models\Project;
use App\Models\Sprint;
use App\Services\SprintService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateSprintController extends Controller
{
    /**
     * Handle the incoming request.
     */

    public function __construct(protected SprintService $sprintService) {}

    public function __invoke(CreateSprintRequest $request, Project $project)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($credentials, $request, $project) {
                $conflict = $this->sprintService->validate(
                    projectId: $project->id,
                    startDate: $credentials["start_date"],
                    endDate: $credentials["end_date"],
                );

                if ($conflict) {
                    return redirect()
                        ->back()
                        ->with(
                            "error",
                            "Tanggal sprint konflik dengan sprint lain.",
                        );
                }

                $lastNumber = $project
                    ->sprints()
                    ->select("number")
                    ->orderBy("number", "asc")
                    ->first()
                    ->toArray()["number"];

                $number = $lastNumber ? $lastNumber + 1 : 1;

                Sprint::create(
                    array_merge($credentials, [
                        "project_id" => $project->id,
                        "number" => $number,
                    ]),
                );
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah sprint baru.");
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
