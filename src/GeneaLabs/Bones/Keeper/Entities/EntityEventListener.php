<?php namespace GeneaLabs\Bones\Keeper\Entities;

use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasAddedEvent;
use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasModifiedEvent;
use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasNotModifiedEvent;
use GeneaLabs\Bones\Marshal\Events\EventListener;
use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Roles\Role;
use Illuminate\Support\Facades\Redirect;

class EntityEventListener extends EventListener
{
    protected $roles;
    protected $actions;
    protected $ownerships;

    public function __construct(Role $role, Action $action, Ownership $ownership)
    {
        $this->roles = $role;
        $this->actions = $action;
        $this->ownerships = $ownership;
    }

    public function whenEntityWasAdded(EntityWasAddedEvent $event)
    {
        $this->event = $event;
        $superadmin = $this->roles->find('SuperAdmin');
        $allActions = $this->actions->all();
        $anyOwnership = $this->ownerships->find('any');
        foreach ($allActions as $action) {
            $permission = new Permission();
            $permission->action()->associate($action);
            $permission->ownership()->associate($anyOwnership);
            $permission->entity()->associate($event->entity);
            $permission->role()->associate($superadmin);
            $permission->save();
        }
    }

    public function whenEntityWasModified(EntityWasModifiedEvent $event)
    {
        $this->event = $event;
    }

    public function whenEntityWasNotModified(EntityWasNotModifiedEvent $event)
    {
        $this->event = $event;
    }
}
