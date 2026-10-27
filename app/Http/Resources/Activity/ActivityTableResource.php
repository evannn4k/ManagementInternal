<?php

namespace App\Http\Resources\Activity;

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
                "is_deleted" => $this->subject?->trashed() ?? false
            ],
            "type" => $this->type,
            "old_data" => $this->old_data,
            "new_data" => $this->new_data,
            "ip_address" => $this->ip_address,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
