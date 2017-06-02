<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Assignment;

class AssignmentPolicy extends LaravelGovernorPolicy
{
    public function create($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'create', 'assignment', $assignment->governor_created_by);
    }

    public function edit($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'edit', 'assignment', $assignment->governor_created_by);
    }

    public function view($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'view', 'assignment', $assignment->governor_created_by);
    }

    public function inspect($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'inspect', 'assignment', $assignment->governor_created_by);
    }

    public function remove($user, Assignment $assignment)
    {
        return $this->validatePermissions($user, 'remove', 'assignment', $assignment->governor_created_by);
    }
}
