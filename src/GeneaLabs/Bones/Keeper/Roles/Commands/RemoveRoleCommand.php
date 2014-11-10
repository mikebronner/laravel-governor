<?php namespace GeneaLabs\Bones\Keeper\Roles\Commands;

class RemoveRoleCommand
{
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }
}
