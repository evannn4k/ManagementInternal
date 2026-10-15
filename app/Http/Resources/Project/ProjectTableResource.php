<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectTableResource extends JsonResource
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
            "name" => $this->name,
            "description" => $this->description,
            "pic_id" => $this->pic_id,
            "created_by" => $this->created_by,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "priority" => $this->priority,
            "repo_url" => $this->repo_url,
            "branch" => $this->branch,
            "teams" => $this->teams,
            "pic" => $this->pic,
            "createdBy" => $this->createdBy,
            "status" => $this->status,
            "statuses" => $this->statuses,
        ];
    }
}
