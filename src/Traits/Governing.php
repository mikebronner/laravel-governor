<?php namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

trait Governing
{
    use Governable;
    
    public function hasRole(string $name) : bool
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
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
        $roleClass = config("genealabs-laravel-governor.models.role");

        return $this->belongsToMany($roleClass, 'governor_role_user', 'user_id', 'role_name');
    }

    public function teams() : BelongsToMany
    {
        $teamClass = config("genealabs-laravel-governor.models.team");

        return $this->belongsToMany($teamClass, "governor_team_user", "user_id", "team_id");
    }

    public function getPermissionsAttribute() : Collection
    {
        $permissionClass = config("genealabs-laravel-governor.models.permission");
        $roleNames = $this->roles->pluck('name');

        return (new $permissionClass)->whereIn('role_name', $roleNames)->get();
    }
}
