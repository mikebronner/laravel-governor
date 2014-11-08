<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Entity;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Models\Role;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class EntitiesController extends \BaseController
{
    public function __construct()
    {
        $this->beforeFilter('auth');
        $this->beforeFilter('csrf', ['on' => 'post']);
    }

    public function index()
    {
        $entities = Entity::groupBy('name')->get();

        return View::make('bones-keeper::entities.index', compact('entities'));
    }

    public function create()
    {
        return View::make('bones-keeper::entities.create');
    }

    public function store()
    {
        $entity = new Entity();
        if (Input::has('name')) {
            $entity->name = Input::get('name');
            $entity->save();
            $entity = Entity::find(Input::get('name'));
            $superadmin = Role::find('SuperAdmin');
            $allActions = Action::all();
            $anyOwnership = Ownership::find('any');
            foreach ($allActions as $action) {
                $permission = new Permission();
                $permission->action()->associate($action);
                $permission->ownership()->associate($anyOwnership);
                $permission->entity()->associate($entity);
                $permission->role()->associate($superadmin);
                $permission->save();
            }
        }

        return Redirect::route('entities.index');
    }

    public function edit($name)
    {
        $entity = Entity::find($name);

        return View::make('bones-keeper::entities.edit', compact('entity'));
    }

    public function update($name)
    {
        $entity = Entity::with('permissions')->find($name);
        if ($entity) {
            if (Input::has('name')) {
                $entity->name = Input::get('name');
                $entity->save();
            }
        }

        return Redirect::route('entities.index');
    }

    public function destroy($name)
    {
        Entity::destroy($name);

        return Redirect::route('entities.index');
    }
}
