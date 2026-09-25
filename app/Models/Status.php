<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Status extends Model
{
    use HasUuids;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
