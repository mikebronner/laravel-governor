<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Entity;
use Illuminate\Foundation\Http\FormRequest as Request;
use Illuminate\Support\Facades\Auth;

class UpdateEntityRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->can('edit', (new Entity()));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
        ];
    }
}
