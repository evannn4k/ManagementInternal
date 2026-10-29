<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Guarded([])]
class Project extends Model
{
    use HasUuids, SoftDeletes;

    public function pic()
    {
        return $this->belongsTo(User::class, "pic_id");
    }

    public function teams()
    {
        return $this->belongsToMany(User::class, "project_team", "project_id", "user_id")->using(ProjectTeam::class);
    }

    public function statuses()
    {
        return $this->hasMany(Status::class);
    }

    public function tasks()
    {
        return $this->hasManyThrough(Task::class, Status::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function defaultStatus()
    {
        return $this->hasOne(Status::class)->oldest("position");
    }

    public function completedStatus()
    {
        return $this->hasOne(Status::class)->latest("position");
    }

    public function activities()
    {
        return $this->morphMany(Activity::class, 'subject');
    }
}
