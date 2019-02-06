<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;
use Illuminate\Support\Facades\Gate;

class CreateRoleRequest extends Request
{
    public function authorize() : bool
    {
        $roleClass = config("laravel-governor.models.role");

        return app('Illuminate\Contracts\Auth\Access\Gate')
            ->allows('create', new $roleClass);
    }

    public function rules() : array
    {
        return [
            'name' => 'required',
        ];
    }
}
