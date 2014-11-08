<?php namespace GeneaLabs\Bones\Keeper;

class InvalidAccessException extends \Exception
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

    public function __get($property)
    {
        $getter = 'get' . $property;
        if (method_exists($this, $getter))
        {
            return $this->$getter();
        } else {
            throw new \Exception("Non-existent property: $property");
        }
    }

    public function __set($property, $value)
    {
        $setter = 'set' . $property;
        if (method_exists($this, $setter))
        {
            $this->$setter($value);
        } else {
            if (method_exists($this, 'get' . $property))
            {
                throw new \Exception("property $property is read-only");
            } else {
                throw new \Exception("Inexistent property: $property");
            }
        }
    }
}
