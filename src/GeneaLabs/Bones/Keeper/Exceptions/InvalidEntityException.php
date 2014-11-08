<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

class InvalidEntityException extends BaseException
{
    private $entity;

    public function getEntity()
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
    }
}
