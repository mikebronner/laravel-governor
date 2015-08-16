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

/**
 * Class BonesKeeperTrait
 * @package GeneaLabs\Bones\Keeper
 */
trait BonesKeeperTrait
{
    /**
     * @param $action
     * @param $ownership
     * @param $entity
     * @param null $ownerUserId
     * @return bool
     */
    public function hasPermissionTo($action, $ownership, $entity, $ownerUserId = null)
    {
        return $this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId);
    }

    /**
     * @param $action
     * @param $ownership
     * @param $entity
     * @param null $ownerUserId
     * @return bool
     * @throws InvalidAccessException
     */
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

    /**
     * @param $action
     * @param $ownership
     * @param $entity
     * @param $ownerUserId
     * @return bool
     * @throws InvalidActionException
     * @throws InvalidEntityException
     * @throws InvalidOwnershipException
     */
    private function prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)
    {
        $action = strtolower($action);
        $entity = strtolower($entity);
        $ownership = strtolower($ownership);
        $hasPermission = false;
        $ownershipTest = ($this->id == $ownerUserId) ? 'own' : 'other';
        $ownership = ($ownership == null) ? [] : $ownership;
        $ownership = (! is_array($ownership)) ? explode('|', strtolower($ownership)) : $ownership;

        $this->checkIfActionExists($action);
        $this->checkIfEntityExists($entity);
        $this->checkIfOwnershipExists($ownership);

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

    /**
     * @param $action
     * @throws InvalidActionException
     */
    private function checkIfActionExists($action) {
        $actions = new Action();
        $actions = $actions->all()->lists('name')->toArray();

        if (!in_array($action, $actions)) {
            $exception = new InvalidActionException('The Action "' . $action . '" does not exist. Use one of: ' . implode(', ', $actions) . '.');
            $exception->action = $action;
            throw $exception;
        }
    }

    /**
     * @param $entity
     * @throws InvalidEntityException
     */
    private function checkIfEntityExists($entity) {
        $entities = new Entity();
        $entities = $entities->all()->lists('name')->toArray();

        if (!in_array($entity, $entities)) {
            $exception = new InvalidEntityException('The Entity "' . $entity . '" does not exist. Use one of: ' . implode(', ', $entities) . '.');
            $exception->entity = $entity;
            throw $exception;
        }
    }

    /**
     * @param $ownership
     * @throws InvalidOwnershipException
     */
    private function checkIfOwnershipExists($ownerships) {
        $allOwnerships = Ownership::all()->lists('name')->toArray();

        foreach ($ownerships as $ownership) {
            if (!in_array($ownership, $allOwnerships)) {
                $exception = new InvalidOwnershipException('The Ownership "' . $ownership . '" does not exist. Use one of: ' . implode(', ', $allOwnerships) . '.');
                $exception->ownership = $ownership;
                throw $exception;
            }
        }
    }

    /**
     * @param $action
     * @param string $ownership
     * @param $entity
     * @return bool
     */
    private function checkPermission($action, $ownership = 'any', $entity)
    {
        if ($this->roles()->count()) {
            $permissions = new Permission();
            $permissions = $permissions->where('action_key', $action)->where('entity_key', $entity)->where(function ($query) use ($ownership) {
                $query->where('ownership_key', $ownership);
                if ($ownership != 'any') {
                    $query->orWhere('ownership_key', 'any');
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

    /**
     * @param $role
     * @return mixed
     */
    public function isA($role)
    {
        $role = new Role();
        $role = $role->find($role);

        return $this->roles->contains($role);
    }

    /**
     * @param $role
     * @return mixed
     */
    public function assignRole($role)
    {
        return $this->roles()->attach($role);
    }

    /**
     * @param $role
     * @return mixed
     */
    public function removeRole($role)
    {
        return $this->roles()->detach($role);
    }

    /**
     * @return mixed
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_key');
    }


    public static function create(array $attributes = [])
    {
        $user = parent::create($attributes);
        $memberRole = Role::findOrFail('Member');
        $user->roles()->attach($memberRole->name);

        return $user;
    }
}
