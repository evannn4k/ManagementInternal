<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\CreateDocumentRequest;
use App\Models\Document;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateDocumentController extends Controller
{
    public function __invoke(CreateDocumentRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::transaction(function () use ($request, $credentials) {
                $files = $credentials['files'] ?? [];

                $userId = Auth::user()->id;

                foreach ($files as $file) {
                    [
                        "file_path" => $filePath,
                        "file_original_name" => $fileOriginalName,
                        "file_size" => $fileSize,
                        "mime_type" => $mimeType
                    ] = FileService::save("document/", $file);

                    Document::create([
                        "documentable_type" => $credentials['documentable_type'] ?? null,
                        "documentable_id" => $credentials['documentable_id'] ?? null,
                        "file_path" => $filePath,
                        "file_name" => $fileOriginalName,
                        "file_size" => $fileSize,
                        "mime_type" => $mimeType,
                        "uploaded_by" => $userId
                    ]);
                }
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil melampirkan dokumen.");
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
