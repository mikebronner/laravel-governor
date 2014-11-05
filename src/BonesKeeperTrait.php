<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

trait BonesKeeperTrait
{
    protected $roles;

	public function hasPermissionTo($action, $ownership, $entity, $ownerUserId = null)
	{
		return $this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId);
	}

	public function hasAccessTo($action, $ownership, $entity, $ownerUserId = null)
	{
		if (!$this->prepPermissionsCheck($action, $ownership, $entity, $ownerUserId)) {
			throw new NoPermissionsException;
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
				$hasPermission = $this->checkPermission( $action, $ownershipTest, $entity );
			} elseif (count($ownership) == 1) {
				$hasPermission = $this->checkPermission( $action, $ownership[0], $entity );
			}
		} else {
			$hasPermission = $this->checkPermission($action, null, $entity);
		}

		return $hasPermission;
	}

	private function checkPermission($action, $ownership = 'any', $entity)
	{
		$this->checkImplementation();
        $action = Action::find($action);
        $entity = Entity::find($entity);
        $ownership = Ownership::find($ownership);
        dd($this->load('userRoles')->userRoles);
        if ($this->load('userRoles')->userRoles()->count()) {
            foreach ($this->userRoles->permissions as $permission) {
                var_dump($action);
                dd($permission);
                if (($permission->action == $action) &&
                    ($permission->entity == $entity) &&
                    ($permission->ownership == $ownership)
                ) {
                    return true;
                }
            }
        }

		return false;
	}

	private function checkImplementation()
	{
		if (!$this->userRoles()) {
			throw new MissingPermissionsImplementationException('Please define a "roles" relationship in your model.');
		}
        $role = new Role();
		if (!$role->permissions()) {
			throw new MissingPermissionsImplementationException('Please define a "permissions" relationship in your Role model.');
		}
		unset($role);
	}

	public function isA($role)
	{
		$this->checkImplementation();
        $role = Role::find($role);

        return $this->roles->contains($role);
	}

	public function assignRole($role)
	{
		$this->checkImplementation();
		return $this->roles()->attach($role);
	}

	public function removeRole($role)
	{
		$this->checkImplementation();
		return $this->roles()->detach($role);
	}

    public function userRoles()
    {
        return $this->belongsToMany('\GeneaLabs\Bones\Keeper\Role', 'role_user', 'user_id', 'role_key');
    }
}
