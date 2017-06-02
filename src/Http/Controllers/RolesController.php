<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\Requests\CreateRoleRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() : View
    {
        $this->authorize('view', (new Role()));
        $roles = (new Role)->orderBy('name')->get();

        return view('genealabs-laravel-governor::roles.index', compact('roles'));
    }

    public function create() : View
    {
        $role = new Role();
        $this->authorize('create', $role);

        return view('genealabs-laravel-governor::roles.create', compact('role'));
    }

    public function store(CreateRoleRequest $request) : RedirectResponse
    {
        (new Role)->create($request->except(['_token']));

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    public function edit($name) : View
    {
        $role = (new Role)->with('permissions')->find($name);
        $this->authorize($role);
        $entities = (new Entity)->whereNotIn('name', ['permission', 'entity'])->get();
        $actions = (new Action)->all();
        $ownerships = (new Ownership)->all();
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

        $ownershipOptions = array_merge(['no' => 'no'], $ownerships->pluck('name', 'name')->toArray());

        return view('genealabs-laravel-governor::roles.edit', compact('role', 'permissionMatrix', 'ownershipOptions'));
    }

    public function update(UpdateRoleRequest $request, $name) : RedirectResponse
    {
        $role = (new Role)->find($name);
        $role->fill($request->only(['name', 'description']));

        if ($request->has('permissions')) {
            $allActions = (new Action)->all();
            $allOwnerships = (new Ownership)->all();
            $allEntities = (new Entity)->all();
            $role->permissions()->delete();

            foreach ($request->get('permissions') as $entity => $actions) {
                foreach ($actions as $action => $ownership) {
                    if ('no' !== $ownership) {
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

        $role->save();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    public function destroy($name) : RedirectResponse
    {
        $role = (new Role)->find($name);
        $this->authorize('remove', $role);
        $role->delete();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }
}
