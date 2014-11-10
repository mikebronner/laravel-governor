<?php namespace GeneaLabs\Bones\Keeper\Entities\Validators;

use GeneaLabs\Bones\Keeper\BonesKeeperBaseValidator;
use GeneaLabs\Bones\Keeper\Entities\Commands\AddEntityCommand;

class AddEntityValidator extends BonesKeeperBaseValidator
{
    protected static $rules = [
        'name' => 'required',
    ];

    public function validate(AddEntityCommand $command)
    {
        $validator = $this->validator->make(['name' => $command->name], static::$rules);
        if ($validator->fails()) {
            die('validation failed');
        }
        var_dump('validation passed');
    }
}
