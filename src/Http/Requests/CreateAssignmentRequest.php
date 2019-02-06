<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class CreateAssignmentRequest extends Request
{
    public function authorize() : bool
    {
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");

        return app('Illuminate\Contracts\Auth\Access\Gate')
            ->allows('create', new $assignmentClass);
    }

    public function rules() : array
    {
        return [
            'users' => 'required',
        ];
    }
}
