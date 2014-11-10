<?php namespace GeneaLabs\Bones\Keeper\Roles\Handlers;

use GeneaLabs\Bones\Marshal\Commands\CommandHandler;
use GeneaLabs\Bones\Marshal\Commands\CommandHandlerInterface;
use GeneaLabs\Bones\Keeper\Entities\Entity;
use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Roles\Role;

/**
 * Class AddEntityHandler
 * @package GeneaLabs\Bones\Keeper\Entities
 */
class ModifyRoleHandler extends CommandHandler implements CommandHandlerInterface
{
    /**
     * @param $command
     */
    public function handle($command)
    {
        $role = Role::modify($command);
        $action = new Action();
        $entity = new Entity();
        $ownership = new Ownership();
        $allActions = $action->all();
        $allOwnerships = $ownership->all();
        $allEntities = $entity->all();
        if ($command->data['permissions']) {
            $role->permissions()->delete();
            foreach ($command->data['permissions'] as $entity => $actions) {
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
        if ($role) {
            $this->dispatcher->dispatch($role->release());
        }
    }
}
