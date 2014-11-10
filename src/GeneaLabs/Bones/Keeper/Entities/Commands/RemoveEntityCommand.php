<?php namespace GeneaLabs\Bones\Keeper\Entities\Commands;

class RemoveEntityCommand
{
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }
}
