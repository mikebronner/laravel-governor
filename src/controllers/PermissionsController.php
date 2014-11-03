<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Permission;
use GeneaLabs\Bones\Keeper\Role;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class PermissionsController extends \BaseController
{
    protected $layoutView;

    public function __construct()
    {
        $this->layoutView = Config::get('genealabs/bones-keeper::config.layoutView');
    }

    public function index()
    {
        $layoutView = $this->layoutView;
        $permissions = Permission::groupBy('entity')->get();

        return View::make('genealabs/bones-keeper::permissions.index', compact('layoutView', 'permissions'));
    }

    public function create()
    {
        $layoutView = $this->layoutView;

        return View::make('genealabs/bones-keeper::permissions.create', compact('layoutView'));
    }

    public function store()
    {
        $superadmin = Role::whereName('SuperAdmin')->get();
        $entity = Input::get('entity');
        $actions = ['create', 'view', 'inspect', 'edit', 'delete'];
        $ownerships = ['own', 'other', 'any'];
        foreach ($actions as $action) {
            foreach ($ownerships as $ownership) {
                $permission = new Permission();
                $permission->action = $action;
                $permission->ownership = $ownership;
                $permission->entity = $entity;
                $permission->description = 'Can ' . $action . ' ' . $ownership . ' ' . $entity . '?';
                $permission->save();
                if ($action == 'any') {
                    $superadmin->permissions()->save($permission);
                }
            }
        }

        return Redirect::route('roles.index');
    }

    public function edit($entity)
    {
        $layoutView = $this->layoutView;
        $permission = Permission::whereEntity($entity)->groupBy('entity')->get()->first();

        return View::make('genealabs/bones-keeper::permissions.edit', compact('layoutView', 'permission'));
    }

    public function update($entity)
    {
        $permissions = Permission::whereEntity($entity)->delete();
        $superadmin = Role::whereName('SuperAdmin')->get();
        $actions = ['create', 'view', 'inspect', 'edit', 'delete'];
        $ownerships = ['own', 'other', 'any'];
        foreach ($actions as $action) {
            foreach ($ownerships as $ownership) {
                $permission = new Permission();
                $permission->action = $action;
                $permission->ownership = $ownership;
                $permission->entity = $entity;
                $permission->description = 'Can ' . $action . ' ' . $ownership . ' ' . $entity . '?';
                $permission->save();
                if ($action == 'any') {
                    $superadmin->permissions()->save($permission);
                }
            }
        }

        return Redirect::route('permissions.index');
    }

    public function destroy($entity)
    {
        $permissions = Permission::whereEntity($entity)->delete();

        return Redirect::route('permissions.index');
    }
}
