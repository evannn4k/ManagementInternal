<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            "guard_name" => $this->guard_name,
            "description" => $this->description,
            "is_system" => $this->is_system,
            "total_users" => $this->users->count(),
            "total_permissions" => $this->permissions->count(),
            "permissions" => $this->permissions->pluck("id"),
        ];
    }
}
