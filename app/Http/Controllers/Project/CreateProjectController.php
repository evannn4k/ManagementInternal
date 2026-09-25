<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\CreateProjectRequest;
use App\Models\Project;
use App\Models\Status;
use Illuminate\Http\Request;
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
                $statuses = $credentials['status'] ?? [];

                unset($credentials['teams'], $credentials['status']);

                $credentials['created_by'] = $request->user()->id;

                $project = Project::create($credentials);

                foreach ($statuses as $status) {
                    Status::create(['project_id' => $project->id, "name" => $status]);
                }

                $project->teams()->sync($teams);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah user baru.");
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
