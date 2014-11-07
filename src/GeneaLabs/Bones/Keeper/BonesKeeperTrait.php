<?php namespace GeneaLabs\Bones\Keeper;

trait BonesKeeperTrait
{
    public function hasPermissionTo($action, $ownership, $entity, $ownerUserId = null)
    {
        return $this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId);
    }

    public function hasAccessTo($action, $ownership, $entity, $ownerUserId = null)
    {
        if (!$this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)) {
            $exception = new NoPermissionsException();
            $exception->action = $action;
            $exception->ownership = $ownership;
            $exception->entity = $ownership;
            throw $exception;
        }
    }

    private function prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)
    {
        $action = strtolower($action);
        $entity = strtolower($entity);
        $hasPermission = false;
        $ownershipTest = ($this->id == $ownerUserId) ? 'own' : 'other';
        $ownership = ($ownership == null) ? [] : $ownership;
        $ownership = (!is_array($ownership)) ? explode('|', strtolower($ownership)) : $ownership;
        if (count($ownership)) {
            if (in_array($ownershipTest, $ownership)) {
                $hasPermission = $this->checkPermission($action, $ownershipTest, $entity);
            } elseif (count($ownership) == 1) {
                $hasPermission = $this->checkPermission($action, $ownership[0], $entity);
            }
        } else {
            $hasPermission = $this->checkPermission($action, null, $entity);
        }

        return $hasPermission;
    }

    private function checkPermission($action, $ownership = 'any', $entity)
    {
        if ($this->roles()->count()) {
            $permissions = Permission::where('action_key', $action)->where('entity_key', $entity)->where(function ($query) use ($ownership) {
                $query->where('ownership_key', $ownership);
                if ($ownership != 'any') {
                    $query->orWhere('ownship_key', 'any');
                }
            })->get();
            foreach ($permissions as $permission) {
                if ($this->roles->contains($permission->role)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function isA($role)
    {
        $role = Role::find($role);

        return $this->roles->contains($role);
    }

    public function assignRole($role)
    {
        return $this->roles()->attach($role);
    }

    public function removeRole($role)
    {
        return $this->roles()->detach($role);
    }

    public function roles()
    {
        return $this->belongsToMany('\GeneaLabs\Bones\Keeper\Role', 'role_user', 'user_id', 'role_key');
    }
}
