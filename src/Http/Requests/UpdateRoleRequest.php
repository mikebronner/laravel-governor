<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Foundation\Http\FormRequest as Request;

class UpdateRoleRequest extends Request
{
    public function authorize() : bool
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        $this->role = (new $roleClass)
            ->find($this->role);

        return auth()->check()
            && ($this->role
                ? auth()->user()->can("update", $this->role)
                : auth()->user()->can("create", $roleClass));
    }

    public function rules() : array
    {
        return [
            'name' => 'required|string',
            "description" => "string|nullable",
            "permissions" => "array",
        ];
    }

    public function process()
    {
        $permissionClass = config("genealabs-laravel-governor.models.permission");
        $this->role->fill($this->all());

        if ($this->filled('permissions')) {
            $this->role->permissions()->delete();

            foreach ($this->permissions as $group) {
                foreach ($group as $entity => $actions) {
                    foreach ($actions as $action => $ownership) {
                        if ('no' !== $ownership) {
                            $currentPermission = (new $permissionClass)
                                ->firstOrNew([
                                    "action_name" => $action,
                                    "entity_name" => $entity,
                                    "role_name" => $this->role->name,
                                ]);
                            $currentPermission->ownership_name = $ownership;
                            $currentPermission->save();
                        }
                    }
                }
            }
        }

        $this->role->save();
    }
}
