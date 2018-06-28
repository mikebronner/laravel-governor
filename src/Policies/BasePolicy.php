<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Permission;
use Illuminate\Database\Eloquent\Model;

abstract class BasePolicy
{
    protected $entity;
    protected $permissions;

    public function __construct()
    {
        $policyClass = collect(explode('\\', get_class($this)))->last();
        $this->entity = str_replace('policy', '', strtolower($policyClass));
        $this->permissions = Permission::with('role')->get();
    }

    public function before($user)
    {
        return $user->isRole("SuperAdmin")
            ? true
            : null;
    }

    public function create(Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'create',
            $this->entity
        );
    }

    public function edit(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'edit',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function view(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'view',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function inspect(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'inspect',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function remove(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'remove',
            $this->entity,
            $model->governor_created_by
        );
    }

    protected function validatePermissions($user, $action, $entity, $entityCreatorId = null) : bool
    {
        $user->load('roles');

        if (! $user->roles) {
            return false;
        }

        $ownership = 'other';

        if ($user->getKey() === $entityCreatorId) {
            $ownership = 'own';
        }

        $filteredPermissions = $this->filterPermissions($action, $entity, $ownership);

        foreach ($filteredPermissions as $permission) {
            if ($user->roles->contains($permission->role)) {
                return true;
            }
        }

        return false;
    }

    protected function filterPermissions($action, $entity, $ownership)
    {
        $filteredPermissions = $this->permissions->filter(function ($permission) use ($action, $entity, $ownership) {
            return ($permission->action_key === $action
                && $permission->entity_key === $entity
                && in_array($permission->ownership_key, [$ownership, 'any']));
        });

        return $filteredPermissions;
    }
}
