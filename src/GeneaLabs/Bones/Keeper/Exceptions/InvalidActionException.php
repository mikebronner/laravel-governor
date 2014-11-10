<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

use GeneaLabs\Bones\Keeper\BonesKeeperBaseException;

/**
 * Class InvalidActionException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidActionException extends BonesKeeperBaseException
{
    /**
     * @var
     */
    private $action;

    /**
     * @return mixed
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * @param $action
     */
    public function setAction($action)
    {
        $this->action = $action;
    }
}
