<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Action;
use GeneaLabs\Bones\Keeper\Entity;
use GeneaLabs\Bones\Keeper\Ownership;
use GeneaLabs\Bones\Keeper\Permission;
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
        Role::create(Input::all());

        return Redirect::route('roles.index');
    }

    public function edit($name)
    {
        $layoutView = $this->layoutView;
        $role = Role::with('permissions')->find($name);
        $entities = Entity::all();
        $actions = Action::all();
        $ownerships = Ownership::all();
        $permissionMatrix = [];
        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                $selectedOwnership = 'no';
                foreach ($role->permissions as $permissioncheck) {
                    if (($permissioncheck->entity->name == $entity->name) &&
                        ($permissioncheck->action->name == $action->name))
                    {
                        $selectedOwnership = $permissioncheck->ownership->name;
                    }
                }
                $permissionMatrix[$entity->name][$action->name] = $selectedOwnership;
            }
        }
        $ownershipOptions = array_merge(['no' => 'no'], $ownerships->lists('name', 'name'));
        return View::make('genealabs/bones-keeper::roles.edit', compact('layoutView', 'role', 'permissionMatrix', 'ownershipOptions'));
    }

    public function update($name)
    {
        $role = Role::find($name);
        $role->name = Input::has('name') ? Input::get('name') : $role->name;
        $role->description = Input::has('description') ? Input::get('description') : $role->description;
        $role->save();
        $role = Role::find(Input::get('name'));
        $allActions = Action::all();
        $allOwnerships = Ownership::all();
        $allEntities = Entity::all();
        if (Input::has('permissions')) {
            $role->permissions()->delete();
            foreach (Input::get('permissions') as $entity => $actions) {
                foreach ($actions as $action => $ownership) {
                    if ('no' != $ownership) {
                        $currentAction = $allActions->find($action);
                        $currentOwnership = $allOwnerships->find($ownership);
                        $currentEntity = $allEntities->find($entity);
                        $currentPermission = new Permission();
                        $currentPermission->ownership()->associate($currentOwnership);
                        $currentPermission->action()->associate($currentAction);
                        $currentPermission->role()->associate($role);
                        $currentPermission->entity()->associate($currentEntity);
                        $currentPermission->save();
                    }
                }
            }
        }

        return Redirect::route('roles.index');
    }

    public function destroy($name)
    {
        Role::destroy($name);

        return Redirect::route('roles.index');
    }
}
