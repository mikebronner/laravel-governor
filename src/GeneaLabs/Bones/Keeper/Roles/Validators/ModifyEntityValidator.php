<?php namespace GeneaLabs\Bones\Keeper\Roles\Validators;

use GeneaLabs\Bones\Keeper\Roles\Commands\ModifyRoleCommand;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseValidator;

class ModifyEntityValidator extends BonesMarshalBaseValidator
{
    protected static $rules = [
        'name' => 'required',
        'description' => 'required',
    ];

    public function validate(ModifyRoleCommand $command)
    {
        $validator = $this->validator->make([
            'name' => $command->name,
            'description' => $command->description,
        ], static::$rules);
        if ($validator->fails()) {
            die('validation failed');
        }
        var_dump('validation passed');
    }
}
