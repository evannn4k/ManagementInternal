<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteSubTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, SubTask $subTask)
    {
        try {
            DB::transaction(function () use ($request, $subTask) {
                $subTask->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => $subTask,
                    "ip_address" => $request->ip(),
                ]);

                Activity::where("subject_id", $subTask->id)->update(["subject_name" => $subTask->name]);

                $subTask->delete();
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus subtugas.");
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
