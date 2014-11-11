<?php namespace GeneaLabs\Bones\Keeper\Entities\Validators;

use GeneaLabs\Bones\Keeper\Entities\Commands\ModifyEntityCommand;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseValidator;

class ModifyEntityValidator extends BonesMarshalBaseValidator
{
    protected static $rules = [
        'name' => 'required',
    ];

    public function validate(ModifyEntityCommand $command)
    {
        $validator = $this->validator->make(['name' => $command->name], static::$rules);
        if ($validator->fails()) {
            die('validation failed');
        }
        var_dump('validation passed');
    }
}
