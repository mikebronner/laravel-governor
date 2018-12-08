<?php namespace GeneaLabs\LaravelGovernor\Policies;

use Illuminate\Database\Eloquent\Model;

class Role extends BasePolicy
{
    public function update(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }
        return true;

        return $this->validatePermissions(
            $user,
            'update',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function delete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return $this->validatePermissions(
            $user,
            'delete',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function restore(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return $this->validatePermissions(
            $user,
            'restore',
            $this->entity,
            $model->governor_created_by
        );
    }

    public function forceDelete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return $this->validatePermissions(
            $user,
            'forceDelete',
            $this->entity,
            $model->governor_created_by
        );
    }
}

