<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateStatusProjectRequest;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateStatusProjectController extends Controller
{
    public function __invoke(UpdateStatusProjectRequest $request, Status $status)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($credentials, $request, $status) {
                $diffData = array_diff_assoc($credentials, $status->only(array_keys($credentials)));

                $status->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => $status->only(array_keys($diffData)),
                    "new_data" => $diffData,
                    "ip_address" => $request->ip(),
                ]);

                $status->update($credentials);
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil mengedit status proyek.");
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
