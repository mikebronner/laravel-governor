<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Entity;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Models\Role;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

/**
 * Class RolesController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
//        $this->middleware('csrf', ['on' => 'post']);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        if (Auth::user()->hasAccessTo('view', 'any', 'role')) {
            $roles = Role::orderBy('name')->get();

            return view('genealabs-bones-keeper::roles.index', compact('roles'));
        }
    }

    /**
     * @return mixed
     */
    public function create()
    {
        if (Auth::user()->hasAccessTo('add', 'any', 'role')) {
            return view('genealabs-bones-keeper::roles.create');
        }
    }

    /**
     * @return mixed
     */
    public function store()
    {
        if (Auth::user()->hasAccessTo('add', 'any', 'role')) {
            Role::create(Input::all());

            return redirect()->route('roles.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        if (Auth::user()->hasAccessTo('change', 'any', 'role')) {
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
                            ($permissioncheck->action->name == $action->name)
                        ) {
                            $selectedOwnership = $permissioncheck->ownership->name;
                        }
                    }
                    $permissionMatrix[$entity->name][$action->name] = $selectedOwnership;
                }
            }
            $ownershipOptions = array_merge(['no' => 'no'], $ownerships->lists('name', 'name'));

            return view('genealabs-bones-keeper::roles.edit', compact('role', 'permissionMatrix', 'ownershipOptions'));
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update($name)
    {
        if (Auth::user()->hasAccessTo('change', 'any', 'role')) {
            $role = Role::find($name);

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

            $role->fill(Input::only(['name', 'description']));
            $role->save();

            return redirect()->route('roles.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        if (Auth::user()->hasAccessTo('remove', 'any', 'role')) {
            Role::destroy($name);

            return redirect()->route('roles.index');
        }
    }
}
