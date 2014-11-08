<?php namespace GeneaLabs\Bones\Keeper;

use Exception;

class BaseException extends Exception
{
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