<?php namespace GeneaLabs\Bones\Keeper;

class InvalidOwnershipException extends BaseException
{
    private $ownership;

    public function getOwnership()
    {
        return $this->ownership;
    }

    public function setOwnership($ownership)
    {
        $this->ownership = $ownership;
    }
}
