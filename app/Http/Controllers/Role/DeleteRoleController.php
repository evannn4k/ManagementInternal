<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class DeleteRoleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Role $role)
    {
        try {
            $role->delete();

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus role.");
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
