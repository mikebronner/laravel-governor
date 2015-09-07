<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

trait Governable
{
    /**
     * @return Collection
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_key');
    }

    /**
     * @return bool
     */
    public function getIsSuperAdminAttribute()
    {
        $superAdminRole = Role::where('name', 'SuperAdmin')->first();
        $this->load('roles');

        return $this->roles->contains($superAdminRole->name);
    }
}
