<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubTask\UpdateSubTaskRequest;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateSubTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateSubTaskRequest $request, SubTask $subTask)
    {
        $credentials = $request->validated();
        try {
            DB::transaction(function ()  use ($request, $credentials, $subTask) {
                $oldIsComplete = $subTask->is_completed;

                $subTask->is_completed = $credentials["status"];

                $subTask->save();

                $subTask->activities()->create([
                    "user_id" => Auth::user()->id,
                    "type" => "update",
                    "old_data" => ["is_completed" => $oldIsComplete],
                    "new_data" => ["is_completed" => $subTask->is_completed],
                    "ip_address" => $request->ip(),
                ]);
            });

            return redirect()
                ->back();
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
