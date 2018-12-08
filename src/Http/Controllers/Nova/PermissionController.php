<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Support\Collection;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Response;

class PermissionController extends Controller
{
    public function __construct()
    {
        //
    }

    public function index() : array
    {
        $roleKey = request("filter") === "role_key"
            ? request("value")
            : null;
        $role = (new Role)
            ->with("permissions.action", "permissions.entity", "permissions.ownership")
            ->where("name", $roleKey)
            ->first();
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
        $entities = (new Entity)
            ->whereNotIn('name', ['permission', 'entity', "action", "ownership"])
            ->get();
        $actions = (new Action)
            ->all();
        $ownerships = (new Ownership)
            ->all();
        $permissionMatrix = [];

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                $selectedOwnership = 'no';

                foreach ($role->permissions as $permissioncheck) {
                    if (($permissioncheck->entity->name === $entity->name)
                        && ($permissioncheck->action->name === $action->name)) {
                        $selectedOwnership = $permissioncheck->ownership->name;
                    }
                }

                $permissionMatrix[$entity->name][$action->name] = $selectedOwnership;
            }
        }

        $ownershipOptions = array_merge(['no' => 'no'], $ownerships->pluck('name', 'name')->toArray());

        return $permissionMatrix;
    }
}
