<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Validation\Factory as Validator;

class BonesKeeperBaseValidator
{
    /**
     * @var
     */
    protected $validator;

    public function __construct(Validator $validator)
    {
        $this->validator = $validator;
    }
}
