<?php namespace GeneaLabs\LaravelGovernor\Traits;

use GeneaLabs\LaravelGovernor\Permissions;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait Governable
{
    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_key');
    }

    /**
     * @SuppressWarnings(PHPMD.BooleanGetMethodName)
     */
    public function getIsSuperAdminAttribute() : bool
    {
        $superAdminRole = (new Role)->where('name', 'SuperAdmin')->first();
        $this->load('roles');

        if ($this->roles->isEmpty()) {
            return false;
        }

        return $this->roles->contains($superAdminRole->name);
    }

    public function getPermissionsAttribute() : Collection
    {
        $roleNames = $this->roles->pluck('name');

        return (new Permission)->whereIn('role_key', $roleNames)->get();
    }
}
