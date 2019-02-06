<?php namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

trait Governable
{
    public function hasRole(string $name) : bool
    {
        $roleClass = config("laravel-governor.models.role");
        $this->load('roles');

        if ($this->roles->isEmpty()) {
            return false;
        }

        $role = (new $roleClass)
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
        $roleClass = config("laravel-governor.models.role");

        return $this->belongsToMany($roleClass, 'role_user', 'user_id', 'role_key');
    }

    public function getPermissionsAttribute() : Collection
    {
        $permissionClass = config("laravel-governor.models.permission");
        $roleNames = $this->roles->pluck('name');

        return (new $permissionClass)->whereIn('role_key', $roleNames)->get();
    }
}
