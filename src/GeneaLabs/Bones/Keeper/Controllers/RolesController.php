<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\BonesKeeperBaseController;
use GeneaLabs\Bones\Marshal\Commands\CommandBus;
use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Entities\Entity;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Roles\Commands\AddRoleCommand;
use GeneaLabs\Bones\Keeper\Roles\Commands\ModifyRoleCommand;
use GeneaLabs\Bones\Keeper\Roles\Commands\RemoveRoleCommand;
use GeneaLabs\Bones\Keeper\Roles\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

/**
 * Class RolesController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class RolesController extends BonesKeeperBaseController
{
    public function __construct(CommandBus $commandBus)
    {
        parent::__construct($commandBus);
        $this->beforeFilter('auth');
        $this->beforeFilter('csrf', ['on' => 'post']);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        if (Auth::user()->hasAccessTo('view', 'any', 'role')) {
            $roles = Role::orderBy('name')->get();

            return View::make('bones-keeper::roles.index', compact('roles'));
        }
    }

    /**
     * @return mixed
     */
    public function create()
    {
        if (Auth::user()->hasAccessTo('create', 'any', 'role')) {
            return View::make('bones-keeper::roles.create');
        }
    }

    /**
     * @return mixed
     */
    public function store()
    {
        if (Auth::user()->hasAccessTo('create', 'any', 'role')) {
            $command = new AddRoleCommand(Input::all());
            $this->execute($command);

            return Redirect::route('roles.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        if (Auth::user()->hasAccessTo('edit', 'any', 'role')) {
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

            return View::make('bones-keeper::roles.edit', compact('role', 'permissionMatrix', 'ownershipOptions'));
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update($name)
    {
        if (Auth::user()->hasAccessTo('edit', 'any', 'role')) {
            $command = new ModifyRoleCommand($name, Input::all());
            $this->execute($command);

            return Redirect::route('roles.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        if (Auth::user()->hasAccessTo('remove', 'any', 'role')) {
            $command = new RemoveRoleCommand($name);
            $this->execute($command);

            return Redirect::route('roles.index');
        }
    }
}
