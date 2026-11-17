<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([""])]
class Comment extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function commentable()
    {
        return $this->morphTo();
    }
}
