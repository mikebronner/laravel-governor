<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

/**
 * Class InvalidEntityException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidEntityException extends BaseException
{
    /**
     * @var
     */
    private $entity;

    /**
     * @return mixed
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * @param $entity
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
    }
}
