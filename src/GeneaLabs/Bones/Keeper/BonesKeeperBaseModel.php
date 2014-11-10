<?php namespace GeneaLabs\Bones\Keeper;


use GeneaLabs\Bones\Marshal\Events\EventGenerator;
use Watson\Validating\ValidatingTrait;

/**
 * Class BaseModel
 * @package GeneaLabs\Bones\Keeper\Models
 */
class BonesKeeperBaseModel extends \BaseModel
{
    use ValidatingTrait;
    use EventGenerator;

    /**
     * @var bool
     */
    protected $throwValidationExceptions = true;
}
