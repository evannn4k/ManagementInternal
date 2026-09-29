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
        return $this->belongsToMany(Task::class, "assigned_task", "task_id", "user_id")->using(AssignedTask::class);
    }

    // protected $cats = [
    //     "label" => "array"
    // ];
}
