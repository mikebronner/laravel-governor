<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use KoNB\User;

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
//        $role = Role::find('Adventurer');
//        $user = User::with('roles')->find($this->id);
//        Role::all();
        $this->load('roles');
        $role = Role::with('users')->find('SuperAdmin');
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        $test = User::with('roles')->find($this->id);
        $test->load('roles');
        dd($app);
        if (count($this->roles)) {
            foreach ($this->roles->permissions as $permission) {
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
		$role = new Role();

		if (!$this->roles()) {
			throw new MissingPermissionsImplementationException('Please define a "roles" relationship in your model.');
		}
		if (!$role->permissions()) {
			throw new MissingPermissionsImplementationException('Please define a "permissions" relationship in your Role model.');
		}
		unset($role);
	}

	public function isA($name)
	{
		$this->checkImplementation();
        $role = Role::find($name);

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

    public function roles()
    {
        return $this->belongsToMany('GeneaLabs\Bones\Keeper\Role', 'role_user', 'role', 'user_id');
    }
}
