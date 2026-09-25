<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateProjectRequest extends FormRequest
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
            "name" => "required|max:255|string",
            "pic_id" => "required|integer|exists:users,id",
            "start_date" => "required|date",
            "end_date" => "required|date|after_or_equal:start_date",
            "description" => "required|string",
            "priority" => "required|string|in:low,medium,high",
            "repo_url" => "required|string|max:255",
            "branch" => "required|string|max:255",
            "status" => "required|array",
            "status.*" => "required|string|max:255",
            "teams" => "nullable|array",
            "teams.*" => "nullable|integer|exists:users,id"
        ];
    }
}
