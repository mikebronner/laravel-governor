<?php namespace GeneaLabs\Bones\Keeper;

use GeneaLabs\Bones\Marshal\Commands\CommandBus;

/**
 * Class BonesKeeperBaseController
 * @package GeneaLabs\Bones\Keeper
 */
class BonesKeeperBaseController extends \BaseController
{
    /**
     * @var CommandBus
     */
    protected $commandBus;

    public function __construct(CommandBus $commandBus)
    {
        $this->commandBus = $commandBus;
    }

    /**
     * @param $command
     */
    protected function execute($command)
    {
        $this->commandMarshaller->execute($command);
    }
}
