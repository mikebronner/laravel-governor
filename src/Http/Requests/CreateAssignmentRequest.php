<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Assignment;
use Illuminate\Foundation\Http\FormRequest as Request;

class CreateAssignmentRequest extends Request
{
    public function authorize() : bool
    {
        return app('Illuminate\Contracts\Auth\Access\Gate')->allows('create', (new Assignment()));
    }

    public function rules() : array
    {
        return [
            'users' => 'required',
        ];
    }
}
