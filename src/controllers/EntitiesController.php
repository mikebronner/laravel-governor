<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Action;
use GeneaLabs\Bones\Keeper\Entity;
use GeneaLabs\Bones\Keeper\Ownership;
use GeneaLabs\Bones\Keeper\Permission;
use GeneaLabs\Bones\Keeper\Role;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class EntitiesController extends \BaseController
{
    protected $layoutView;

    public function __construct()
    {
        $this->layoutView = Config::get('genealabs/bones-keeper::config.layoutView');
    }

    public function index()
    {
        $layoutView = $this->layoutView;
        $entities = Entity::groupBy('name')->get();

        return View::make('genealabs/bones-keeper::entities.index', compact('layoutView', 'entities'));
    }

    public function create()
    {
        $layoutView = $this->layoutView;

        return View::make('genealabs/bones-keeper::entities.create', compact('layoutView'));
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
        $layoutView = $this->layoutView;
        $entity = Entity::find($name);

        return View::make('genealabs/bones-keeper::entities.edit', compact('layoutView', 'entity'));
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
