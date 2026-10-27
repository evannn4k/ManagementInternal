<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
class SubTask extends Model
{
    use HasUuids;

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
