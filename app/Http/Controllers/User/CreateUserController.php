<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class CreateUserController extends Controller
{
    public function __invoke(CreateUserRequest $request)
    {
        $credentials = $request->validated();

        try {
            $user = User::create($credentials);
            $role = Role::findOrFail($credentials['role_id']);

            $user->assignRole($role);
            
            return redirect()
                ->back()
                ->with("success", "Berhasil menambah user baru.");
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
