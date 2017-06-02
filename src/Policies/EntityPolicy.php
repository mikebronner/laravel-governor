<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Entity;

class EntityPolicy extends LaravelGovernorPolicy
{
    public function create($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'create', 'entity', $entity->governor_created_by);
    }

    public function edit($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'edit', 'entity', $entity->governor_created_by);
    }

    public function view($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'view', 'entity', $entity->governor_created_by);
    }

    public function inspect($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'inspect', 'entity', $entity->governor_created_by);
    }

    public function remove($user, Entity $entity)
    {
        return $this->validatePermissions($user, 'remove', 'entity', $entity->governor_created_by);
    }
}
