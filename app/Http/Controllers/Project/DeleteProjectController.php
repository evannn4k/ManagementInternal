<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Project $project, Request $request)
    {
        try {
            DB::transaction(function () use ($request, $project) {
                $project->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "delete",
                    "old_data" => $project,
                    "ip_address" => $request->ip(),
                ]);

                $project->delete();
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus proyek.");
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
