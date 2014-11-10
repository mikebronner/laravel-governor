<?php namespace GeneaLabs\Bones\Keeper\Roles;

use GeneaLabs\Bones\Keeper\Entities\Entity;
use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasAddedEvent;
use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasModifiedEvent;
use GeneaLabs\Bones\Marshal\Events\EventListener;
use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;

class RoleEventListener extends EventListener
{
    protected $actions;
    protected $ownerships;
    protected $entities;

    public function __construct(Entity $entity, Action $action, Ownership $ownership)
    {
        $this->actions = $action;
        $this->ownerships = $ownership;
        $this->entities = $entity;
    }

    public function whenRoleWasAdded(RoleWasAddedEvent $event)
    {
        $this->event = $event;
    }

    public function whenRoleWasModified(RoleWasModifiedEvent $event)
    {
        $this->event = $event;
    }
}
