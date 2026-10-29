<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArchiveProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Project $project)
    {
        try {
            DB::transaction(function () use ($request, $project) {
                $project->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => ["status" => $project->status],
                    "new_data" => ["status" => "archive"],
                    "ip_address" => $request->ip(),
                ]);

                $project->status = "archived";
                $project->save();
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengarsip proyek.");
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
