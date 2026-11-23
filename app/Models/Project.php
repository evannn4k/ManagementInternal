<?php

namespace App\Models;

use App\Models\Activity;
use App\Models\Document;
use App\Models\ProjectTeam;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Guarded([])]
class Project extends Model
{
    use HasUuids, SoftDeletes;

    public function scopeArchived()
    {
        return $this->where("status", "archived");
    }

    public function pic()
    {
        return $this->belongsTo(User::class, "pic_id");
    }

    public function teams()
    {
        return $this->belongsToMany(
            User::class,
            "project_team",
            "project_id",
            "user_id",
        )->using(ProjectTeam::class);
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
        return $this->morphMany(Activity::class, "subject");
    }

    public function childActivities()
    {
        return $this->morphMany(Activity::class, "parent");
    }

    public function documents()
    {
        return $this->morphMany(Document::class, "documentable");
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, "commentable");
    }

    public function sprints()
    {
        return $this->hasMany(Sprint::class);
    }
}
