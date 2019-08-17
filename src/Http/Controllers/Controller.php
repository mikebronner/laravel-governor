<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
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
        $permissionClass = config("genealabs-laravel-governor.models.permission");
        (new $permissionClass)->where('role_name', 'SuperAdmin')->delete();
        $entities = (new Entity)
            ->getCached();
        $actions = (new Action)
            ->getCached();

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                (new $permissionClass)->updateOrCreate([
                    'role_name' => 'SuperAdmin',
                    'entity_name' => $entity->name,
                    'action_name' => $action->name,
                    'ownership_name' => 'any',
                ]);
            }
        }
    }
}
