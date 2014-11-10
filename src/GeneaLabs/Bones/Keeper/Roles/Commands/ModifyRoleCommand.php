<?php namespace GeneaLabs\Bones\Keeper\Roles\Commands;

class ModifyRoleCommand
{
    public $name;
    public $data;

    public function __construct($name, $data) {
        $this->name = $name;
        $this->data = $data;
    }
}
