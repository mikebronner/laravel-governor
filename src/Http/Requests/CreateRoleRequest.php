<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Foundation\Http\FormRequest as Request;
use Illuminate\Support\Facades\Gate;

class CreateRoleRequest extends Request
{
    public function authorize() : bool
    {
        return app('Illuminate\Contracts\Auth\Access\Gate')->allows('create', (new Role()));
    }

    public function rules() : array
    {
        return [
            'name' => 'required',
        ];
    }
}
