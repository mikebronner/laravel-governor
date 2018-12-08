<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Foundation\Http\FormRequest as Request;
use Illuminate\Support\Facades\Gate;

class StoreRoleRequest extends Request
{
    public function authorize() : bool
    {
        return auth()->check()
            && auth()->user()->can("create", Role::class);
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
        $role = new Role;
        $role->fill($this->all());
        $role->save();

        return $role;
    }
}
