<?php namespace GeneaLabs\LaravelGovernor\Policies;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;

abstract class BasePolicy
{
    protected $entity;
    protected $permissions;

    public function __construct()
    {
        $this->createGovernorOwnedByFields();
        $policyClass = collect(explode('\\', get_class($this)))->last();
        $this->entity = str_replace('policy', '', strtolower($policyClass));
        $this->permissions = $this->getPermissions();
    }

    protected function createGovernorOwnedByFields()
    {
        $gate = app("Illuminate\Contracts\Auth\Access\Gate");
        $reflection = new ReflectionClass($gate);
        $property = $reflection->getProperty('policies');
        $property->setAccessible(true);
        $protectedClass = collect($property->getValue($gate))
            ->flip()
            ->get(get_class($this));
        $model = new $protectedClass;

        if (! in_array("GeneaLabs\\LaravelGovernor\\Traits\\Governable", class_uses_recursive($model))) {
            return;
        }

        $connection = $model
            ->getConnection()
            ->getName();
        $governorOwnedByExists = app("cache")
            ->rememberForever("governor-{$model->getTable()}-table-check-ownedby-field", function () use ($connection, $model) {
                return Schema::connection($connection)
                    ->hasColumn($model->getTable(), 'governor_owned_by');
            });

        if (! $governorOwnedByExists
            && ! Schema::connection($connection)->hasColumn($model->getTable(), 'governor_owned_by')
        ) {
            Schema::connection($connection)->table($model->getTable(), function (Blueprint $table) use ($model) {
                $authModelPrimaryKeyType = config("genealabs-laravel-governor.auth-model-primary-key-type", "bigInteger");
                $fieldType = "unsigned";

                switch (strtolower($authModelPrimaryKeyType)) {
                    case "integer":
                        $fieldType .= "Integer";
                        break;
                    default:
                        $fieldType .= "BigInteger";
                        break;
                }

                $table->{$fieldType}('governor_owned_by')
                    ->nullable();
            });
            app("cache")->forget("governor-{$model->getTable()}-table-check-ownedby-field");
        }
    }

    protected function getPermissions() : Collection
    {
        return app("cache")->remember("governorpermissions", 5, function () {
            $permissionClass = config("genealabs-laravel-governor.models.permission");

            return (new $permissionClass)->get();
        });
    }

    public function create(Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'create',
            $this->entity
        );
    }

    public function update(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'update',
            $this->entity,
            $model
        );
    }

    public function viewAny(Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'viewAny',
            $this->entity
        );
    }

    public function view(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'view',
            $this->entity,
            $model
        );
    }

    public function delete(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'delete',
            $this->entity,
            $model
        );
    }

    public function restore(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'restore',
            $this->entity,
            $model
        );
    }

    public function forceDelete(Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'forceDelete',
            $this->entity,
            $model
        );
    }

    protected function validatePermissions(
        Model $user,
        string $action,
        string $entity,
        Model $model = null
    ) : bool {
        $user->load("roles", "teams");

        if ($user->hasRole("SuperAdmin")) {
            return true;
        }

        if ($user->roles->isEmpty()
            && $user->teams->isEmpty()
        ) {
            return false;
        }

        $ownership = 'other';

        if ($user->getKey() === $model->governor_owned_by) {
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
        $filteredPermissions = $this->permissions->filter(function ($permission) use ($action, $entity, $ownership) {
            return ($permission->action_name === $action
                && $permission->entity_name === $entity
                && in_array($permission->ownership_name, [$ownership, 'any']));
        });

        return $filteredPermissions;
    }
}
