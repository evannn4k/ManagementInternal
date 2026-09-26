<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Project extends Model
{
    use HasUuids;

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
}
