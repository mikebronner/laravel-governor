<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Entity;

class EntityPolicy extends LaravelGovernorPolicy
{
    public function create($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'create', 'announcement', $entity->created_by);
    }

    public function edit($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'edit', 'announcement', $entity->created_by);
    }

    public function view($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'view', 'announcement', $entity->created_by);
    }

    public function inspect($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'inspect', 'announcement', $entity->created_by);
    }

    public function remove($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'remove', 'announcement', $entity->created_by);
    }
}
