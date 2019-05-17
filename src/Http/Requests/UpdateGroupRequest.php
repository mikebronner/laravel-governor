<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class UpdateGroupRequest extends Request
{
    public function authorize() : bool
    {
        $groupClass = config("genealabs-laravel-governor.models.group");

        return auth()->check()
            && ($this->group
                ? auth()->user()->can("update", $this->group)
                : auth()->user()->can("create", $groupClass));
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
        $actionClass = config("genealabs-laravel-governor.models.action");
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $ownershipClass = config("genealabs-laravel-governor.models.ownership");
        $permissionClass = config("genealabs-laravel-governor.models.permission");
        $roleClass = config("genealabs-laravel-governor.models.role");
        $role = $this->id
            ? (new $roleClass)->find($this->id)
            : new $roleClass;
        $role->fill($this->all());

        if ($this->filled('permissions')) {
            $allActions = (new $actionClass)->all();
            $allOwnerships = (new $ownershipClass)->all();
            $allEntities = (new $entityClass)->all();
            $role->permissions()->delete();

            foreach ($this->permissions as $entity => $actions) {
                foreach ($actions as $action => $ownership) {
                    if ('no' !== $ownership) {
                        $currentAction = $allActions->find($action);
                        $currentOwnership = $allOwnerships->find($ownership);
                        $currentEntity = $allEntities->find($entity);
                        $currentPermission = new $permissionClass;
                        $currentPermission->ownership()->associate($currentOwnership);
                        $currentPermission->action()->associate($currentAction);
                        $currentPermission->role()->associate($role);
                        $currentPermission->entity()->associate($currentEntity);
                        $currentPermission->save();
                    }
                }
            }
        }

        $role->save();
    }
}
