<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
#[Appends(['subject_name'])]
class Activity extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->morphTo()->withTrashed();
    }

    public function scopeTaskProject(Builder $query, string $projectId)
    {
        return $query
            ->where("subject_type", Task::class)
            ->whereHas("subject.status.project", function ($q) use ($projectId) {
                return $q->where("id", $projectId);
            });
    }

    protected function getSubjectNameAttribute()
    {
        if (!$this->subject) {
            return 'unknown';
        }

        return $this->subject->name ?? $this->subject->title ?? $this->subject->username ?? "Item " . $this->subject_id;
    }

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];
}
