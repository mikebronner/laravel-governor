<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;

trait Governable
{
    /**
     * @param Role $role
     * @return Collection
     */
    public function assignRole(Role $role)
    {

        return $this->roles()->attach($role);
    }

    /**
     * @param Role $role
     * @return Collection
     */
    public function removeRole(Role $role)
    {
        return $this->roles()->detach($role);
    }

    /**
     * @return Collection
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

    public function getDisplayNameAttribute()
    {
        $name = $this->getAttribute('first_name') . ' ' . $this->getAttribute('last_name');

        if (! strlen(trim($name))) {
            $name = $this->getAttribute('name');
        }

        if (! strlen(trim($name))) {
            $name = $this->getAttribute('email');
        }

        return $name;
    }
}
