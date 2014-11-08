<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

class InvalidAccessException extends BaseException
{
    private $action;
    private $entity;
    private $ownership;

    public function getAction()
    {
        return $this->action;
    }

    public function setAction($action)
    {
        $this->action = $action;
    }

    public function getEntity()
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
    }

    public function getOwnership()
    {
        return $this->ownership;
    }

    public function setOwnership($ownership)
    {
        $this->ownership = $ownership;
    }
}
