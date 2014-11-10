<?php namespace GeneaLabs\Bones\Keeper\Roles;

class RoleEvent
{
    public $role;

    public function __construct(Role $role)
    {
        $this->role = $role;
    }
}
