<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Task extends Model
{
    use HasUuids;

    public function assigned()
    {
        return $this->belongsToMany(User::class, "assigned_task", "task_id", "user_id")->using(AssignedTask::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function activities()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    protected function casts(): array
    {
        return [
            'label' => 'array',
        ];
    }
}
