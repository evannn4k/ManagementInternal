<?php

namespace App\Http\Controllers\Project\Sprint;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Sprint\UpdateSprintRequest;
use App\Models\Project;
use App\Models\Sprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateSprintController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        UpdateSprintRequest $request,
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
                        "Tidak bisa mengubah status sprint $sprint->name.",
                    );
            }

            DB::transaction(function () use ($request, $credentials, $sprint) {
                $sprint->update($credentials);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengubah sprint $sprint->name.");
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
