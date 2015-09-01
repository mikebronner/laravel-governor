<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Role;

class RolePolicy extends LaravelGovernorPolicy
{
    public function create($user, Role $role)
    {
        return $this->validatePermissions($user, 'create', 'announcement', $role->created_by);
    }

    public function edit($user, Role $role)
    {
        return $this->validatePermissions($user, 'edit', 'announcement', $role->created_by);
    }

    public function view($user, Role $role)
    {
        return $this->validatePermissions($user, 'view', 'announcement', $role->created_by);
    }

    public function inspect($user, Role $role)
    {
        return $this->validatePermissions($user, 'inspect', 'announcement', $role->created_by);
    }

    public function remove($user, Role $role)
    {
        return $this->validatePermissions($user, 'remove', 'announcement', $role->created_by);
    }
}
