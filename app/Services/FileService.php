<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileService
{
    public static function save($path, $file, $oldName = null)
    {
        if ($oldName) {
            Storage::delete("file/" . $path . $oldName);
        }

        $filename = time() . "-" . rand(000000, 999999) . "-" . $file->getClientOriginalName();
        $file->storeAs("file/" . $path, $filename);

        return "file/" . $path . $filename;
    }

    public static function destroy($path, $oldName)
    {
        Storage::delete("file/" . $path . $oldName);
    }
}
