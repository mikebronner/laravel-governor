<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Traits\EntityManagement;
use GeneaLabs\LaravelGovernor\Traits\GovernorOwnedByField;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BasePolicy
{
    use EntityManagement;
    use GovernorOwnedByField;
    
    protected $entity;
    protected $permissions;
    
    public function __construct()
    {
        $this->createGovernorOwnedByFieldsByPolicy($this);
        $this->entity = $this->getEntity(get_class($this));
        $this->permissions = $this->getPermissions();
    }
    
    protected function getPermissions() : Collection
    {
        return app("cache")->remember("governor-permissions", 300, function () {
            $permissionClass = config("genealabs-laravel-governor.models.permission");
            
            return (new $permissionClass)->with("role")->get();
        });
    }
    
    public function create(?Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'create',
            $this->entity
        );
    }
    
    public function update(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'update',
            $this->entity,
            $model
        );
    }
    
    public function viewAny(?Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'viewAny',
            $this->entity
        );
    }
    
    public function view(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'view',
            $this->entity,
            $model
        );
    }
    
    public function delete(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'delete',
            $this->entity,
            $model
        );
    }
    
    public function restore(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'restore',
            $this->entity,
            $model
        );
    }
    
    public function forceDelete(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'forceDelete',
            $this->entity,
            $model
        );
    }
    
    protected function validatePermissions(
        ?Model $user,
        string $action,
        string $entity,
        Model $model = null
    ) : bool {
        if (! $user) {
            $user = $this->createGuestUser();
        }

        if ($user->hasRole("SuperAdmin")) {
            return true;
        }
        
        if ($user->roles->isEmpty()
            && $user->teams->isEmpty()
        ) {
            return false;
        }

        $ownership = 'other';
        
        if ($model
            && $user->getKey() === $model->governor_owned_by
        ) {
            $ownership = 'own';
        }
        
        $filteredPermissions = $this->filterPermissions($action, $entity, $ownership);

        foreach ($filteredPermissions as $permission) {
            if ($user->roles->contains($permission->role)
                || $user->teams->contains($permission->team)
            ) {
                return true;
            }
        }

        return false;
    }
    
    protected function filterPermissions($action, $entity, $ownership)
    {
        $filteredPermissions = $this
            ->permissions
            ->filter(function ($permission) use ($action, $entity, $ownership) {
                return ($permission->action_name === $action
                    && $permission->entity_name === $entity
                    && in_array($permission->ownership_name, [$ownership, 'any']));
            });
        
        return $filteredPermissions;
    }

    protected function createGuestUser()
    {
        if (! auth()->user()) {
            $roleClass = config("genealabs-laravel-governor.models.role");
            $userClass = config("genealabs-laravel-governor.models.auth");
            $user = new $userClass;
            $guest = (new $roleClass)->find("Guest");

            if ($guest) {
                $user->roles = collect([$guest]);
            }

            auth()->setUser($user);

            return $user;
        }
    }
}
