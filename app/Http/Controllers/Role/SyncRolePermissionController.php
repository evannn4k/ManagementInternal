<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\SyncRolePermissionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class SyncRolePermissionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SyncRolePermissionRequest $request, Role $role)
    {
        $credentials = $request->validated();

        try {
            $role->syncPermissions($credentials["permissions_id"]);

            return redirect()
                ->back()
                ->with("success", "Berhasil merubah perizinan $role->name.");
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
