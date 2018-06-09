<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Foundation\Http\FormRequest as Request;
use Illuminate\Support\Facades\Gate;

class UpdateRoleRequest extends Request
{
    public function authorize() : bool
    {
        return auth()->check()
            && ($this->role
                ? auth()->user()->can("edit", $this->role)
                : auth()->user()->can("create", Role::class));
    }

    public function rules() : array
    {
        return [
            'name' => 'required|string',
            "description" => "string",
            "permissions" => "array",
        ];
    }

    public function process()
    {
        $role = $this->role
            ?? new Role;
        $role->fill($this->all());

        if ($this->filled('permissions')) {
            $allActions = (new Action)->all();
            $allOwnerships = (new Ownership)->all();
            $allEntities = (new Entity)->all();
            dump($role->permissions);
            $role->permissions()->delete();

            foreach ($this->permissions as $entity => $actions) {
                foreach ($actions as $action => $ownership) {
                    if ('no' !== $ownership) {
                        $currentAction = $allActions->find($action);
                        $currentOwnership = $allOwnerships->find($ownership);
                        $currentEntity = $allEntities->find($entity);
                        $currentPermission = new Permission();
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
