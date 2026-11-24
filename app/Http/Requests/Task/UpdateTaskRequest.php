<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "required|string|max:255",
            "description" => "nullable|string",
            "priority" => "required|in:urgent,high,medium,low",
            "due_date" => "nullable|date",
            "label" => "nullable|array",
            "label.*" => "nullable|string",
            "sprint_id" => "nullable|uuid|exists:sprints,id",
            "assigned" => "nullable|array",
            "assigned.*" => "nullable|integer",
        ];
    }
}
