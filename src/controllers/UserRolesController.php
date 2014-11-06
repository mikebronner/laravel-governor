<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Role;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class UserRolesController extends \BaseController
{
    protected $layoutView;
    protected $user;
    protected $displayNameField;

    public function __construct()
    {
        $this->layoutView = Config::get('genealabs/bones-keeper::config.layoutView');
        $this->displayNameField = Config::get('genealabs/bones-keeper::config.displayNameField');
        $this->user = App::make(\Config::get('auth.model'));
    }

    public function index()
    {
        $layoutView = $this->layoutView;
        $displayNameField = $this->displayNameField;
        $users = $this->user->all();
        $usersArray = $users->lists($this->user['primaryKey'], $this->displayNameField);
        $roles = Role::with('users')->get();
        $userList = [];

        foreach ($usersArray as $displayName => $id) {
            array_push($userList, ['id' => $id, 'name' => $displayName]);
        }

        return View::make('genealabs/bones-keeper::userroles.index', compact('layoutView', 'users', 'roles', 'displayNameField', 'userList'));
    }

    public function store()
    {
        if (Input::has('users')) {
            $assignedUsers = Input::get('users');
            $roles = Role::with('users')->get();
            $roles->each(function ($role) {
                $role->users()->detach();
            });
            foreach ($assignedUsers as $role => $users) {
                if ($role == 'SuperAdmin' || $role == 'Member') {
                    continue;
                }
                $currentRole = Role::with('users')->find($role);
                $currentRole->users()->attach($users);
            }

            // add all users to members role
            $allUsers = $this->user->with('roles')->get();
            $allUsers->each(function ($user) {
                $user->roles()->attach('Member');
            });

            // remove superadmin users from any other roles
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

        return Redirect::route('userroles.index');
    }
}
