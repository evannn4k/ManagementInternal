<?php

namespace App\Http\Resources\Activity;

use App\Models\Project;
use App\Models\Status;
use App\Models\SubTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityTableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "user" => $this->whenLoaded('user'),
            "subject" => [
                "id" => $this->subject?->id,
                "type" => class_basename($this->subject_type),
                "name" => $this->subject_name,
                // "is_deleted" => $this->subject ? (method_exists($this->subject, "trashed") && $this->subject?->trashed()) || (class_basename($this->subject_type) == "Project" && $this->subject->status == "archived") : false
            ],
            "type" => $this->type,
            "old_data" => $this->old_data,
            "new_data" => $this->new_data,
            "ip_address" => $this->ip_address,
            "target_url" => $this->resolveTargetUrl(),
            "is_disabled" => $this->resolveIsDisabled(),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }

    protected function resolveTargetUrl()
    {
        if ($this->subject_type == Task::class) {
            return route("task.detail", $this->subject_id);
        }

        if ($this->subject_type == Project::class) {
            return route("project.detail", $this->subject_id);
        }

        if ($this->subject_type == Status::class) {
            return route("project.detail", $this->parent_id);
        }

        if ($this->subject_type == SubTask::class) {
            if ($this->subject) {
                return route("task.detail", $this->subject->task->id) . "#SubTask";
            }
        }

        return '';
    }

    protected function resolveIsDisabled()
    {
        return $this->subject ? (method_exists($this->subject, "trashed") && $this->subject?->trashed()) || (class_basename($this->subject_type) == "Project" && $this->subject->status == "archived") : true;
    }
}
