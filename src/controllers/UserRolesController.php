<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Role;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class UserRolesController extends \BaseController
{
    protected $user;
    protected $displayNameField;

    public function __construct()
    {
        $this->beforeFilter('auth');
        $this->beforeFilter('csrf', ['on' => 'post']);
        $this->displayNameField = Config::get('bones-keeper::displayNameField');
        $this->user = App::make(Config::get('auth.model'));
    }

    public function index()
    {
        if (Auth::user()->hasAccessTo('view', 'any', 'userrole')) {
            $displayNameField = $this->displayNameField;
            $users = $this->user->all();
            $roles = Role::with('users')->get();

            return View::make('bones-keeper::userroles.index',
                compact('users', 'roles', 'displayNameField', 'userList'));
        }
    }

    public function store()
    {
        if (Auth::user()->hasAccessTo('edit', 'any', 'userrole')) {
            $this->removeAllUsersFromRoles();
            if (Input::has('users')) {
                $assignedUsers = Input::get('users');
                $this->assignUsersToRoles($assignedUsers);
                $this->addAllUsersToMemberRole();
                $this->removeAllSuperAdminUsersFromOtherRoles($assignedUsers);
            }

            return Redirect::route('userroles.index');
        }
    }

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

    private function removeAllUsersFromRoles()
    {
        $roles = Role::with('users')->get();
        $roles->each(function ($role) {
            $role->users()->detach();
        });
    }
}
