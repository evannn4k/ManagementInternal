<?php

namespace App\Http\Requests\Document;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateDocumentRequest extends FormRequest
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
            'files' => 'required|array|min:1',
            'files.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png,docx,xlsx,pptx,txt,sql,zip,json,md|max:10240',
            'documentable_type' => 'nullable|string|in:App\Models\Project,App\Models\Task,App\Models\User',
            'documentable_id' => 'nullable|string|uuid',
        ];
    }
}
