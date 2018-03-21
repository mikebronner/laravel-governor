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
        $this->role = (new Role)->find($this->name);

        return app('Illuminate\Contracts\Auth\Access\Gate')
            ->allows('edit', $this->role);
    }

    public function rules() : array
    {
        return [
            'name' => 'required',
        ];
    }

    public function process()
    {
        $role = (new Role)->find($this->name);
        $this->authorize('edit', $role);
        $role->fill($this->only(['name', 'description']));

        if ($this->filled('permissions')) {
            $allActions = (new Action)->all();
            $allOwnerships = (new Ownership)->all();
            $allEntities = (new Entity)->all();
            $role->permissions()->delete();
            $role->save();

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
    }
}
