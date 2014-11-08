<?php namespace GeneaLabs\Bones\Keeper;

use GeneaLabs\Bones\Keeper\Exceptions\InvalidAccessException;
use GeneaLabs\Bones\Keeper\Exceptions\InvalidActionException;
use GeneaLabs\Bones\Keeper\Exceptions\InvalidEntityException;
use GeneaLabs\Bones\Keeper\Exceptions\InvalidOwnershipException;
use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Entity;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Models\Role;

trait BonesKeeperTrait
{
    public function hasPermissionTo($action, $ownership, $entity, $ownerUserId = null)
    {
        return $this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId);
    }

    public function hasAccessTo($action, $ownership, $entity, $ownerUserId = null)
    {
        if (!$this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)) {

            $exception = new InvalidAccessException();
            $exception->action = $action;
            $exception->ownership = $ownership;
            $exception->entity = $ownership;
            throw $exception;
        }

        return true;
    }

    private function prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)
    {
        $action = strtolower($action);
        $entity = strtolower($entity);
        $ownership = strtolower($ownership);
        $this->checkIfActionExists($action);
        $this->checkIfEntityExists($entity);
        $this->checkIfOwnershipExists($ownership);
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

    private function checkIfActionExists($action) {
        $actions = Action::all()->lists('name');
        if (!in_array($action, $actions)) {
            $exception = new InvalidActionException('The Action "' . $action . '" does not exist. Use one of: ' . implode(', ', $actions) . '.');
            $exception->action = $action;
            throw $exception;
        }
    }

    private function checkIfEntityExists($entity) {
        $entities = Entity::all()->lists('name');
        if (!in_array($entity, $entities)) {
            $exception = new InvalidEntityException('The Entity "' . $entity . '" does not exist. Use one of: ' . implode(', ', $entities) . '.');
            $exception->entity = $entity;
            throw $exception;
        }
    }

    private function checkIfOwnershipExists($ownership) {
        $ownerships = Ownership::all()->lists('name');
        if (!in_array($ownership, $ownerships)) {
            $exception = new InvalidOwnershipException('The Ownership "' . $ownership . '" does not exist. Use one of: ' . implode(', ', $ownerships) . '.');
            $exception->ownership = $ownership;
            throw $exception;
        }
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
        return $this->belongsToMany('\GeneaLabs\Bones\Keeper\Models\Role', 'role_user', 'user_id', 'role_key');
    }
}
