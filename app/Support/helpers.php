<?php

if (!function_exists('human_file_type')) {
    function human_file_type(string $mimeType): string
    {
        $mapping = [
            'application/pdf' => 'Dokumen PDF',
            'image/jpeg' => 'Gambar JPEG',
            'image/png' => 'Gambar PNG',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'Dokumen Word',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'Spreadsheet Excel',
            'application/zip' => 'Arsip ZIP',
            'text/plain' => 'File Teks',
        ];

        return $mapping[$mimeType] ?? 'Berkas Lampiran';
    }
}
