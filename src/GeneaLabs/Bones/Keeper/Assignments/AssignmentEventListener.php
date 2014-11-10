<?php namespace GeneaLabs\Bones\Keeper\Assignments;

use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasAddedEvent;
use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasModifiedEvent;
use GeneaLabs\Bones\Marshal\Events\EventListener;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;

class AssignmentEventListener extends EventListener
{
    public function whenRoleWasAdded(RoleWasAddedEvent $event)
    {
        $this->event = $event;
    }

    public function whenRoleWasModified(RoleWasModifiedEvent $event)
    {
        $this->event = $event;
    }
}
