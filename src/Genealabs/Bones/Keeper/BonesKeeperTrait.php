<?php namespace GeneaLabs\Bones\Keeper;

//use GeneaLabs\Role;

trait BonesKeeperTrait
{
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
//		if ($ownerUserId == null) {
//			$ownership = [];
//		}
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

	private function checkPermission($action, $ownership, $entity)
	{
		$this->checkImplementation();
		foreach ($this->roles as $role) {
			foreach ($role->permissions as $permission) {
//				var_dump($permission->action . "|" . $action . "|" . $permission->entity . "|" . $entity . "|" . $permission->ownership . "|" . $ownership);
				if (($permission->action == $action) &&
				    ($permission->entity == $entity)) {
					if (($ownership == null) || ($ownership == '')) {
						return true;
					} elseif ($permission->ownership == $ownership) {
						return true;
					}
				}
			}
		}

		return false;
	}

	private function checkImplementation()
	{
		$role = new Role();

		if (!$this->roles) {
			throw new MissingPermissionsImplementationException('Please define a "roles" relationship in your model.');
		}
		if (!$role->permissions) {
			throw new MissingPermissionsImplementationException('Please define a "permissions" relationship in your Role model.');
		}
		unset($role);
	}

	public function isA($name)
	{
		$this->checkImplementation();
		foreach ($this->roles as $role) {
			if ($role->name == $name) {
				return true;
			}
		}

		return false;
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

    public function roles()
    {
        return $this->belongsToMany('Genealabs\Bones\Keeper\Role', 'role_user', 'user_id', 'role');
    }
}
