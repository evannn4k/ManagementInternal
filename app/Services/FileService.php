<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileService
{
    public static function save($path, $file, $oldName = null)
    {
        if ($oldName) {
            Storage::delete($oldName);
        }

        $filename = time() . "-" . rand(000000, 999999) . "-" . $file->getClientOriginalName();
        $file->storeAs("file/" . $path, $filename);

        return "file/" . $path . $filename;
    }

    public static function destroy($path)
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
