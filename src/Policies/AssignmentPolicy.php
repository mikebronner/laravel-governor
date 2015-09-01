<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Assignment;

class AssignmentPolicy extends LaravelGovernorPolicy
{
    public function create($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'create', 'announcement', $assignment->created_by);
    }

    public function edit($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'edit', 'announcement', $assignment->created_by);
    }

    public function view($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'view', 'announcement', $assignment->created_by);
    }

    public function inspect($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'inspect', 'announcement', $assignment->created_by);
    }

    public function remove($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'remove', 'announcement', $assignment->created_by);
    }
}
