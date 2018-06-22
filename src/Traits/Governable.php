<?php namespace GeneaLabs\LaravelGovernor\Traits;

use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

trait Governable
{
    public function is($role)
    {
        $this->load('roles');

        if ($this->roles->isEmpty()) {
            return false;
        }

        if ($this->roles->contains("SuperAdmin")) {
            return true;
        }

        $role = (new Role)
            ->where('name', $role)
            ->first();

        return $this->roles->contains($role->name);
    }

    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_key');
    }

    public function getPermissionsAttribute() : Collection
    {
        $roleNames = $this->roles->pluck('name');

        return (new Permission)->whereIn('role_key', $roleNames)->get();
    }
}
