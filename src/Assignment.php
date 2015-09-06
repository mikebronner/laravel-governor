<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $user;

    public function __construct()
    {
        parent::__construct();

        $this->user = app(config('auth.model'));
    }

    public function addAllUsersToMemberRole()
    {
        $allUsers = $this->user->with('roles')->get();
        $allUsers->each(function ($user) {
            if (! $user->roles->contains('Member')) {
                $user->roles()->attach('Member');
            }
        });
    }

    public function removeAllSuperAdminUsersFromOtherRoles($assignedUsers)
    {
        $role = 'SuperAdmin';

        if (array_key_exists($role, $assignedUsers)) {
            $users = $assignedUsers[$role];

            foreach ($users as $id) {
                $user = $this->user->with('roles')->find($id);
                $user->roles()->detach();
            }

            $currentRole = Role::with('users')->find($role);
            $currentRole->users()->attach($users);
        }
    }

    public function assignUsersToRoles($assignedUsers)
    {
        foreach ($assignedUsers as $role => $users) {
            if ($role === 'SuperAdmin' || $role === 'Member') {
                continue;
            }

            $currentRole = Role::with('users')->find($role);
            $currentRole->users()->attach($users);
        }
    }

    public function removeAllUsersFromRoles()
    {
        $roles = Role::with('users')->get();
        $roles->each(function ($role) {
            $role->users()->detach();
        });
    }


    public function getAllUsersOfRole($role)
    {
        $role = Role::with('users')->find($role);

        return $role->users;
    }
}
