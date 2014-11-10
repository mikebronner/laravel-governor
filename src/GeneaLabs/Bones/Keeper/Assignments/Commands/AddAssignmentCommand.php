<?php namespace GeneaLabs\Bones\Keeper\Assignments\Commands;

class AddAssignmentCommand
{
    public $users;

    public function __construct($input) {
        $this->users = $input['users'];
    }
}
