<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class StoreRoleRequest extends Request
{
    public function authorize() : bool
    {
        $roleClass = config("genealabs-laravel-governor.models.role");

        return auth()->check()
            && auth()->user()->can("create", $roleClass);
    }

    public function rules() : array
    {
        return [
            'name' => 'required|string',
            "description" => "string|nullable",
        ];
    }

    public function process()
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        $role = new $roleClass;
        $role->fill($this->all());
        $role->save();

        return $role;
    }
}
