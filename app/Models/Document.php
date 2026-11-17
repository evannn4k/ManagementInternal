<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Document extends Model
{
    use HasUuids;

    public function documentable()
    {
        return $this->morphTo();
    }

    public function activities()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
