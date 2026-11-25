<?php

namespace App\Http\Controllers\Project\Sprint;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Sprint\ChangeStatusSprintRequest;
use App\Models\Project;
use App\Models\Sprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChangeStatusSprintController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        ChangeStatusSprintRequest $request,
        Project $project,
        Sprint $sprint,
    ) {
        $credentials = $request->validated();

        try {
            if ($sprint->status == "completed") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Tidak bisa mengubah status sprint yang sudah selesai.",
                    );
            }

            if (
                $sprint->status == "planned" &&
                $credentials["status"] == "completed"
            ) {
                return redirect()->back()->with("error", "Status tidak valid.");
            }

            if (
                $sprint->status == "planned" &&
                Sprint::where("project_id", $project->id)
                    ->where("status", "active")
                    ->exists()
            ) {
                return redirect()
                    ->back()
                    ->with("error", "Sudah terdapat sprint aktif.");
            }

            DB::transaction(function () use ($request, $credentials, $sprint) {
                $sprint->status = $credentials["status"];
                $sprint->save();
            });

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengubah status sprint $sprint->name.",
                );
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
