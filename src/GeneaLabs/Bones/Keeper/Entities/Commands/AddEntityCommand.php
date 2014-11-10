<?php namespace GeneaLabs\Bones\Keeper\Entities\Commands;

class AddEntityCommand
{
    public $name;

    public function __construct($input) {
        $this->name = $input['name'];
    }
}
