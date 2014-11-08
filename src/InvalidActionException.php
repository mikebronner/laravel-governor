<?php namespace GeneaLabs\Bones\Keeper;

class InvalidActionException extends BaseException
{
    private $action;

    public function getAction()
    {
        return $this->action;
    }

    public function setAction($action)
    {
        $this->action = $action;
    }
}
