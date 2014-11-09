<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

/**
 * Class InvalidAccessException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidAccessException extends BaseException
{
    /**
     * @var
     */
    private $action;
    /**
     * @var
     */
    private $entity;
    /**
     * @var
     */
    private $ownership;

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

    /**
     * @return mixed
     */
    public function getOwnership()
    {
        return $this->ownership;
    }

    /**
     * @param $ownership
     */
    public function setOwnership($ownership)
    {
        $this->ownership = $ownership;
    }
}
