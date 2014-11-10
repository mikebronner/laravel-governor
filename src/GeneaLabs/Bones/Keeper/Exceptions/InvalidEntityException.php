<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

use GeneaLabs\Bones\Keeper\BonesKeeperBaseException;

/**
 * Class InvalidEntityException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidEntityException extends BonesKeeperBaseException
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
