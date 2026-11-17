<?php

namespace App\Http\Controllers\Comment;

use App\Http\Requests\Comment\CreateCommentRequest;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateCommentController extends Controller
{
    public function __invoke(CreateCommentRequest $request)
    {
        $credentials = $request->validated();

        try {
            $credentials["user_id"] = Auth::user()->id;
            
            Comment::create($credentials);

            return redirect()
                ->back()
                ->with("success", "Berhasil mengirim komentar baru.");
        } catch (\Exception $e) {
            Log::error("Error : " . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    "error",
                    "Terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
