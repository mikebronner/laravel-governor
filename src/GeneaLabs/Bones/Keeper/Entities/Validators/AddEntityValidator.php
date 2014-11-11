<?php namespace GeneaLabs\Bones\Keeper\Entities\Validators;

use GeneaLabs\Bones\Keeper\Entities\Commands\AddEntityCommand;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseValidator;

class AddEntityValidator extends BonesMarshalBaseValidator
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
