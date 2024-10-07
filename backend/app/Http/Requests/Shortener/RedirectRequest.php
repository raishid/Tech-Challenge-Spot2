<?php

namespace App\Http\Requests\Shortener;

use Illuminate\Foundation\Http\FormRequest;

class RedirectRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shorten'   => ['required', 'exists:shorteners,code']
        ];
    }
}
