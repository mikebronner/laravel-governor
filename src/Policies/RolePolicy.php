<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Role;

class RolePolicy extends LaravelGovernorPolicy
{
    public function create($user, Role $role)
    {
        return $this->validatePermissions($user, 'create', 'role', $role->created_by);
    }

    public function edit($user, Role $role)
    {
        return $this->validatePermissions($user, 'edit', 'role', $role->created_by);
    }

    public function view($user, Role $role)
    {
        return $this->validatePermissions($user, 'view', 'role', $role->created_by);
    }

    public function inspect($user, Role $role)
    {
        return $this->validatePermissions($user, 'inspect', 'role', $role->created_by);
    }

    public function remove($user, Role $role)
    {
        return $this->validatePermissions($user, 'remove', 'role', $role->created_by);
    }
}
