<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Http\Requests\CreateRoleRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Traits\EntityManagement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\View\View;

class RolesController extends Controller
{
    use EntityManagement;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): View
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        $this->authorize('viewAny', $roleClass);
        $roles = (new $roleClass)
            ->with("users")
            ->orderBy("name")
            ->get();

        return view('genealabs-laravel-governor::roles.index', compact('roles'));
    }

    public function create(): View
    {
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $ownershipClass = config("genealabs-laravel-governor.models.ownership");
        $roleClass = config("genealabs-laravel-governor.models.role");
        $entities = (new $entityClass)
            ->whereNotIn('name', ['Permission (Laravel Governor)', 'Entity (Laravel Governor)', "Action (Laravel Governor)", "Ownership (Laravel Governor)", "Team Invitation (Laravel Governor)"])
            ->orderBy("group_name")
            ->orderBy("name")
            ->get();
        $ownerships = (new $ownershipClass)
            ->all()
            ->pluck('name', 'name');
        $ownerships = collect(["not" => ""])->merge($ownerships);
        $role = new $roleClass;
        $this->authorize('create', $role);
        $permissionMatrix = $this->createPermissionMatrix($role, $entities);

        return view('genealabs-laravel-governor::roles.create')
            ->with([
                "entities" => $entities,
                "ownerships" => $ownerships,
                "permissionMatrix" => $permissionMatrix,
            ]);
    }

    public function store(CreateRoleRequest $request): RedirectResponse
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        (new $roleClass)->create($request->except(['_token']));

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    public function edit(Role $role): View
    {
        $this->authorize('update', $role);

        $entityClass = config("genealabs-laravel-governor.models.entity");
        $ownershipClass = config("genealabs-laravel-governor.models.ownership");
        $roleClass = config("genealabs-laravel-governor.models.role");
        $teamClass = config("genealabs-laravel-governor.models.team");

        $ownerships = (new $ownershipClass)
            ->all()
            ->pluck('name', 'name');
        $permissibleClass = request("filter") === "team_id"
            ? $teamClass
            : $roleClass;
        $role->load("permissions.action", "permissions.entity", "permissions.ownership");

        if (request("owner") === "yes") {
            return $role
                ->ownedBy
                ->effectivePermissions
                ->toArray();
        }

        $this->parsePolicies();

        $entities = (new $entityClass)
            ->whereNotIn("name", ['Permission (Laravel Governor)', 'Entity (Laravel Governor)', "Action (Laravel Governor)", "Ownership (Laravel Governor)", "Team Invitation (Laravel Governor)"])
            ->orderBy("group_name")
            ->orderBy("name")
            ->get();
        $customActions = (new Action)
            ->get()
            ->filter(function ($action): bool {
                return $action->model_class !== "";
            });

        $permissionMatrix = $this->createPermissionMatrix($role, $entities);
        $ownerships = collect(["not" => "no"])->merge($ownerships);

        return view('genealabs-laravel-governor::roles.edit', compact(
            'customActions',
            'entities',
            'role',
            'permissionMatrix',
            'ownerships'
        ));
    }

    public function update(UpdateRoleRequest $request): RedirectResponse
    {
        $request->process();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $this->authorize('delete', $role);
        $role->delete();

        return redirect()->route('genealabs.laravel-governor.roles.index');
    }

    protected function createPermissionMatrix(Role $role, Collection $entities): array
    {
        $permissionMatrix = [];

        $actionClass = app(config('genealabs-laravel-governor.models.action'));
        $actions = (new $actionClass)
            ->orderBy("name")
            ->get();

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                $selectedOwnership = 'no';

                foreach ($role->permissions as $permissioncheck) {
                    if (($permissioncheck->entity->name === $entity->name)
                        && ($permissioncheck->action->name === $action->name)) {
                        $selectedOwnership = $permissioncheck->ownership->name;
                    }
                }

                $groupName = ucwords(
                    $entity->group_name
                        ?? "Ungrouped"
                );
                $permissionMatrix[$groupName][$entity->name][$action->name] = $selectedOwnership;
            }
        }

        return $permissionMatrix;
    }
}
