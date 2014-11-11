<?php namespace GeneaLabs\Bones\Keeper\Assignments;

use GeneaLabs\Bones\Keeper\Assignments\Events\AssignmentWasAddedEvent;
use GeneaLabs\Bones\Keeper\Roles\Role;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseModel;
use Illuminate\Support\Facades\Config;

class Assignment extends BonesMarshalBaseModel
{
    protected $user;

    public function __construct()
    {
        $this->user = app(config::get('auth.model'));
    }

    public static function add($command)
    {
        $assignment = new Assignment();
        $assignment->removeAllUsersFromRoles();
        if ($command->users) {
            $assignedUsers = $command->users;
            $assignment->assignUsersToRoles($assignedUsers);
            $assignment->addAllUsersToMemberRole();
            $assignment->removeAllSuperAdminUsersFromOtherRoles($assignedUsers);
        }
        $assignment->raise(new AssignmentWasAddedEvent($assignment));

        return $assignment;
    }

    /**
     *
     */
    private function addAllUsersToMemberRole()
    {
        $allUsers = $this->user->with('roles')->get();
        $allUsers->each(function ($user) {
            $user->roles()->attach('Member');
        });
    }

    /**
     * @param $assignedUsers
     */
    private function removeAllSuperAdminUsersFromOtherRoles($assignedUsers)
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

    /**
     * @param $assignedUsers
     */
    private function assignUsersToRoles($assignedUsers)
    {
        foreach ($assignedUsers as $role => $users) {
            if ($role == 'SuperAdmin' || $role == 'Member') {
                continue;
            }
            $currentRole = Role::with('users')->find($role);
            $currentRole->users()->attach($users);
        }
    }

    /**
     *
     */
    private function removeAllUsersFromRoles()
    {
        $roles = Role::with('users')->get();
        $roles->each(function ($role) {
            $role->users()->detach();
        });
    }
}
