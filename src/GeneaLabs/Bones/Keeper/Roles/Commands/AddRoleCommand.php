<?php namespace GeneaLabs\Bones\Keeper\Roles\Commands;

class AddRoleCommand
{
    public $name;
    public $description;

    public function __construct($input) {
        $this->name = $input['name'];
        $this->description = $input['description'];
    }
}
