<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class CreateRoleRequest extends Request
{
    public function authorize() : bool
    {
        $roleClass = config("genealabs-laravel-governor.models.role");

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
