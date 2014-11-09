<?php namespace GeneaLabs\Bones\Keeper\Exceptions;

/**
 * Class InvalidOwnershipException
 * @package GeneaLabs\Bones\Keeper\Exceptions
 */
class InvalidOwnershipException extends BaseException
{
    /**
     * @var
     */
    private $ownership;

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
