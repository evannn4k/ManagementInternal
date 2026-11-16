<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\Mime\MimeTypes;

class FileService
{
    public static function save(string $path, $file, $oldPath = null)
    {
        if ($oldPath) {
            self::destroy($oldPath);
        }

        $filename = time() . "-" . rand(000000, 999999) . "-" . $file->getClientOriginalName();
        $file->storeAs("file/" . $path, $filename);

        $path = "file/" . $path . $filename;

        $mimeType = MimeTypes::getDefault()->getExtensions($file->getMimeType())[0] ?? null;

        return [
            "file_path" => $path,
            "file_original_name" => $file->getClientOriginalName(),
            "file_name" => $filename,
            "file_size" => $file->getSize(),
            "mime_type" => $mimeType
        ];
    }

    public static function destroy(string $path)
    {
        Storage::disk('public')->delete($path);
    }

    public static function download(string $path, string $fileName)
    {
        if (!Storage::disk('public')->exists($path)) {
            throw new \Exception("File tidak ditemukan di server.");
        }

        $fullPath = Storage::disk("public")->path($path);

        return response()->download($fullPath, $fileName);
    }
}
