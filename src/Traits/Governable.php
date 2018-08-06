<?php namespace GeneaLabs\LaravelGovernor\Traits;

use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

trait Governable
{
    public function hasRole(string $name) : bool
    {
        $this->load('roles');

        if ($this->roles->isEmpty()) {
            return false;
        }

        $role = (new Role)
            ->where('name', $name)
            ->first();

        if (! $role) {
            return false;
        }

        return $this->roles->contains($role->name)
            || $this->roles->contains("SuperAdmin");
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
