<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskTableResource extends JsonResource
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
            "status" => $this->status,
            "title" => $this->title,
            "description" => $this->description,
            "priority" => $this->priority,
            "due_date" => $this->due_date,
            "label" => $this->label,
        ];
    }
}
