<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Document;
use App\Models\Status;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteDocumentController extends Controller
{
    public function __invoke(Request $request, Document $document)
    {
        try {
            DB::transaction(function () use ($request, $document) {
                $documentable = $document->documentable;

                FileService::destroy($document->file_path);

                $document->activities()->create([
                    "user_id" => Auth::user()->id,
                    "parent_id" => $documentable->id,
                    "parent_type" => $documentable->getMorphClass(),
                    "subject_last_name" => $document->file_name,
                    "type" => "delete",
                    "old_data" => $document->withoutRelations(),
                    "ip_address" => $request->ip(),
                ]);

                Activity::where("subject_id", $document->id)->update(["subject_last_name" => $document->file_name]);

                $document->delete();
            });

            return redirect()
                ->back()
                ->with("success", "Berhasil menghapus dokumen.");
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
