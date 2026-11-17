<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\CreateDocumentRequest;
use App\Models\Document;
use App\Models\Project;
use App\Models\Task;
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

                $type = $request->input('documentable_type');
                $id = $request->input('documentable_id');

                $parentData = [
                    "parent_type" => null,
                    "parent_id" => null,
                ];

                $haveSubject = $type && $id;

                if ($haveSubject) {
                    if ($type == Task::class) {
                        $parent = $type::with("project")->select("status_id")->find($id)->project;

                        $parentData = [
                            "parent_type" => $parent->getMorphClass(),
                            "parent_id" => $parent->id,
                        ];
                    } else if ($type == Project::class) {
                        $parent = $type::select("id")->find($id);

                        $parentData = [
                            "parent_type" => $parent->getMorphClass(),
                            "parent_id" => $parent->id,
                        ];
                    }
                }

                foreach ($files as $file) {
                    [
                        "file_path" => $filePath,
                        "file_original_name" => $fileOriginalName,
                        "file_size" => $fileSize,
                        "mime_type" => $mimeType
                    ] = FileService::save("document/", $file);

                    $document = Document::create([
                        "documentable_type" => $credentials['documentable_type'] ?? null,
                        "documentable_id" => $credentials['documentable_id'] ?? null,
                        "file_path" => $filePath,
                        "file_name" => $fileOriginalName,
                        "file_size" => $fileSize,
                        "mime_type" => $mimeType,
                        "uploaded_by" => $userId
                    ]);

                    $document->activities()->create(array_merge(
                        [
                            "user_id" => Auth::user()->id,
                            "type" => "create",
                            "new_data" => $document,
                            "ip_address" => $request->ip(),
                        ],
                        $parentData
                    ));
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
                    "Terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
