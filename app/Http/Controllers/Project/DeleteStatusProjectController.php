<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteStatusProjectController extends Controller
{
    public function __invoke(Request $request, Status $status)
    {
        try {
            DB::transaction(function () use ($request, $status) {
                if ($status->tasks()->count() > 0) {
                    return redirect()
                        ->back()
                        ->with(
                            "error",
                            "Status memiliki tugas terkait.",
                        );
                }

                $status->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "delete",
                    "subject_last_name" => $status->name,
                    "old_data" => $status,
                    "ip_address" => $request->ip(),
                ]);

                $status->delete();
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus status proyek.");
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
