<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Response;

class PermissionController extends Controller
{
    public function index() : array
    {
        $actionClass = config("genealabs-laravel-governor.models.action");
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $ownershipClass = config("genealabs-laravel-governor.models.ownership");
        $roleClass = config("genealabs-laravel-governor.models.role");

        $roleKey = request("filter") === "role_key"
            ? request("value")
            : null;
        $role = (new $roleClass)
            ->with("permissions.action", "permissions.entity", "permissions.ownership")
            ->where("name", $roleKey)
            ->first();
        $gate = app('Illuminate\Contracts\Auth\Access\Gate');
        $reflectedGate = new \ReflectionObject($gate);
        $policies = $reflectedGate->getProperty("policies");
        $policies->setAccessible(true);
        $policies = $policies->getValue($gate);

        collect(array_keys($policies))
            ->each(function ($entity) use ($entityClass) {
                $entity = strtolower(collect(explode('\\', $entity))->last());

                return (new $entityClass)
                    ->firstOrCreate([
                        'name' => $entity,
                    ]);
            });
        $entities = (new $entityClass)
            ->whereNotIn('name', ['permission', 'entity', "action", "ownership"])
            ->get();
        $actions = (new $actionClass)
            ->all();
        $ownerships = (new $ownershipClass)
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
