<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\CreateRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class CreateRoleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateRoleRequest $request)
    {
        $credentials = $request->validated();

        try {
            Role::create($credentials);

            return redirect()
                ->back()
                ->with("success", "Berhasil menambah role baru.");
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
