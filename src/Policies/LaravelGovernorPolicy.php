<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Permission;

class LaravelGovernorPolicy
{
    protected $permissions;

    public function __construct()
    {
        $this->permissions = Permission::with('role')->get();
    }

    public function before($user)
    {
        return $user->isSuperAdmin ? true : null;
    }

    protected function validatePermissions($user, $action, $entity, $entityCreatorId)
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
