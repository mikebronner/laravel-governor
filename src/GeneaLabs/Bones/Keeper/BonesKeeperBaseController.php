<?php namespace GeneaLabs\Bones\Keeper;

use GeneaLabs\Bones\Marshal\Commands\CommandValidator;

/**
 * Class BonesKeeperBaseController
 * @package GeneaLabs\Bones\Keeper
 */
class BonesKeeperBaseController extends \BaseController
{
    /**
     * @var CommandBus
     */
    protected $commandMarshaller;

    /**
     * @param CommandValidator $commandValidator
     * @param CommandMarshaller $commandMarshaller
     */
    public function __construct(CommandValidator $commandValidator)
    {
        $this->commandMarshaller = $commandValidator;
    }

    /**
     * @param $command
     */
    protected function execute($command)
    {
        $this->commandMarshaller->execute($command);
    }
}
