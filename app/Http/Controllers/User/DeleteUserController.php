<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteUserController extends Controller
{
    public function __invoke(Request $request, User $user)
    {
        try {
            $user->is_active = false;
            $user->save();

            $user->delete();

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus akun user.");
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
