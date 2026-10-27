<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Guarded([])]
class Task extends Model
{
    use HasUuids, SoftDeletes;

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

    public function subTasks()
    {
        return $this->hasMany(SubTask::class);
    }

    public function scopeOwn($query, User $user, $execution = true)
    {
        if (!$execution) return $query;

        return $query->whereHas("assigned", function ($q) use ($user) {
            return $q->where("id", $user->id);
        });
    }

    public function scopePermissionScopeData($query, User $user)
    {
        $permissions = $user->getAllPermissions()->pluck("name")->toArray();

        if (in_array("task.view.own", $permissions)) {
            return $query->own($user);
        }

        return $query;
    }

    protected function casts(): array
    {
        return [
            'label' => 'array',
        ];
    }
}
