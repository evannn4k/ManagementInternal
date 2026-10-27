<?php

namespace App\Http\Controllers\SubTask;

use App\Http\Controllers\Controller;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteSubTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SubTask $subTask)
    {
        try {
            $subTask->delete();

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
