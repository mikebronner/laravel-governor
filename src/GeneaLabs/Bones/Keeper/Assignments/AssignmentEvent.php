<?php namespace GeneaLabs\Bones\Keeper\Assignments;

class AssignmentEvent
{
    public $assignment;

    public function __construct(Assignment $assignment)
    {
        $this->assignment = $assignment;
    }
}
