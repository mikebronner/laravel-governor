<?php namespace GeneaLabs\Bones\Keeper\Roles\Handlers;

use GeneaLabs\Bones\Marshal\Commands\CommandHandler;
use GeneaLabs\Bones\Marshal\Commands\CommandHandlerInterface;
use GeneaLabs\Bones\Keeper\Roles\Role;

/**
 * Class AddEntityHandler
 * @package GeneaLabs\Bones\Keeper\Entities
 */
class AddRoleHandler extends CommandHandler implements CommandHandlerInterface
{
    /**
     * @param $command
     */
    public function handle($command)
    {
        $role = Role::add($command);
        $this->dispatcher->dispatch($role->release());
    }
}
