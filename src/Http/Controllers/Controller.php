<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth');
    }

    protected function resetSuperAdminPermissions()
    {
        $actionClass = config("genealabs-laravel-governor.models.action");
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $permissionClass = config("genealabs-laravel-governor.models.permission");

        (new $permissionClass)->where('role_key', 'SuperAdmin')->delete();
        $entities = (new $entityClass)->all();
        $actions = (new $actionClass)->all();

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                (new $permissionClass)->updateOrCreate([
                    'role_key' => 'SuperAdmin',
                    'entity_key' => $entity->name,
                    'action_key' => $action->name,
                    'ownership_key' => 'any',
                ]);
            }
        }
    }
}
