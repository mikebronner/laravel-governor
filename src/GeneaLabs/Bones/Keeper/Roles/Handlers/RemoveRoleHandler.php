<?php namespace GeneaLabs\Bones\Keeper\Roles\Handlers;

use GeneaLabs\Bones\Marshal\Commands\CommandHandler;
use GeneaLabs\Bones\Marshal\Commands\CommandHandlerInterface;
use GeneaLabs\Bones\Keeper\Roles\Role;

/**
 * Class AddEntityHandler
 * @package GeneaLabs\Bones\Keeper\Entities
 */
class RemoveRoleHandler extends CommandHandler implements CommandHandlerInterface
{
    /**
     * @param $command
     */
    public function handle($command)
    {
        Role::remove($command);
        $role = new Role();
        $this->dispatcher->dispatch($role->release());
    }
}
