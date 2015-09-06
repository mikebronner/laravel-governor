<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\Requests\CreateRoleRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

/**
 * Class RolesController
 * @package GeneaLabs\LaravelGovernor\Controllers
 */
class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $this->authorize('view', (new Role()));
        $roles = Role::orderBy('name')->get();

        return view('genealabs-laravel-governor::roles.index', compact('roles'));
    }

    /**
     * @return mixed
     */
    public function create()
    {
        $role = new Role();
        $this->authorize('create', $role);

        return view('genealabs-laravel-governor::roles.create', compact('role'));
    }

    /**
     * @return mixed
     */
    public function store(CreateRoleRequest $request)
    {
        Role::create($request->except(['_token']));

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        $role = Role::with('permissions')->find($name);
        $this->authorize($role);
        $entities = Entity::all();
        $actions = Action::all();
        $ownerships = Ownership::all();
        $permissionMatrix = [];

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                $selectedOwnership = 'no';

                foreach ($role->permissions as $permissioncheck) {
                    if (($permissioncheck->entity->name === $entity->name)
                        && ($permissioncheck->action->name === $action->name)
                    ) {
                        $selectedOwnership = $permissioncheck->ownership->name;
                    }
                }

                $permissionMatrix[$entity->name][$action->name] = $selectedOwnership;
            }
        }

        $ownershipOptions = array_merge(['no' => 'no'], $ownerships->lists('name', 'name')->toArray());

        return view('genealabs-laravel-governor::roles.edit', compact('role', 'permissionMatrix', 'ownershipOptions'));
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update(UpdateRoleRequest $request, $name)
    {
        $role = Role::find($name);

        $allActions = Action::all();
        $allOwnerships = Ownership::all();
        $allEntities = Entity::all();

        if ($request->has('permissions')) {
            $role->permissions()->delete();

            foreach ($request->get('permissions') as $entity => $actions) {
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

        $role->fill($request->only(['name', 'description']));
        $role->save();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        $role = Role::find($name);
        $this->authorize('remove', $role);
        $role->destroy();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }
}
