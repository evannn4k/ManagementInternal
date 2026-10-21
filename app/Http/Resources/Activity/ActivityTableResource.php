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
            "table_name" => $this->table_name,
            "target_id" => $this->target_id,
            "target_name" => $this->target_name,
            "target_url" => $this->target_url,
            "type" => $this->type,
            "old_data" => $this->old_data,
            "new_data" => $this->new_data,
            "ip_address" => $this->ip_address,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
