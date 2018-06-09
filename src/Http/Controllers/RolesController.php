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

    public function edit(Role $role) : View
    {
        $this->authorize('edit', $role);

        $gate = app('Illuminate\Contracts\Auth\Access\Gate');
        $reflectedGate = new \ReflectionObject($gate);
        $policies = $reflectedGate->getProperty("policies");
        $policies->setAccessible(true);
        $policies = $policies->getValue($gate);

        collect(array_keys($policies))
            ->each(function ($entity) {
                $entity = strtolower(collect(explode('\\', $entity))->last());

                return (new Entity)
                    ->firstOrCreate([
                        'name' => $entity,
                    ]);
            });
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

    public function update(UpdateRoleRequest $request, Role $role) : RedirectResponse
    {
        $request->process();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    public function destroy(Role $role) : RedirectResponse
    {
        $this->authorize('remove', $role);
        $role->delete();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }
}
