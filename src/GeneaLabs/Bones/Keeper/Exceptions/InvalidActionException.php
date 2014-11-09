<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

/**
 * Class InvalidActionException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidActionException extends BaseException
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
