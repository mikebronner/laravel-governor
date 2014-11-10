<?php namespace GeneaLabs\Bones\Keeper\Assignments\Validators;

use GeneaLabs\Bones\Keeper\AddAssignmentCommand;
use GeneaLabs\Bones\Keeper\BonesKeeperBaseValidator;

class AddRoleValidator extends BonesKeeperBaseValidator
{
    protected static $rules = [
        'name' => 'required',
        'description' => 'required',
    ];

    public function validate(AddAssignmentCommand $command)
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
