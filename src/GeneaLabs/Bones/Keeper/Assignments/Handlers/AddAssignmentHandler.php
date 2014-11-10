<?php namespace GeneaLabs\Bones\Keeper\Assignments\Handlers;

use GeneaLabs\Bones\Keeper\Assignments\Assignment;
use GeneaLabs\Bones\Marshal\Commands\CommandHandler;
use GeneaLabs\Bones\Marshal\Commands\CommandHandlerInterface;

/**
 * Class AddEntityHandler
 * @package GeneaLabs\Bones\Keeper\Entities
 */
class AddAssignmentHandler extends CommandHandler implements CommandHandlerInterface
{
    public function handle($command)
    {
        $entity = Assignment::add($command);
        $this->dispatcher->dispatch($entity->release());
    }

}
