<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
class Activity extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];
}
