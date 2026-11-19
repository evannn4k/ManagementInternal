<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
        return $this->morphMany(Activity::class, "subject");
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, "uploaded_by");
    }

    public function scopeAccessibleData(Builder $query, User $user)
    {
        if ($user->can("document.view.own")) {
            return $query->where("uploaded_by", Auth::user()->id);
        }

        if ($user->can("document.view.all")) {
            return $query;
        }

        return $query->whereRaw("1 = 0");
    }
}
