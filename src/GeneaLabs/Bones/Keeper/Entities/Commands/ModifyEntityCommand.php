<?php namespace GeneaLabs\Bones\Keeper\Entities\Commands;

class ModifyEntityCommand
{
    public $name;
    public $data;

    public function __construct($name, $data) {
        $this->name = $name;
        $this->data = $data;
    }
}
