<?php namespace GeneaLabs\LaravelGovernor\Policies;

use Illuminate\Database\Eloquent\Model;

class Role extends BasePolicy
{
    public function delete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::delete($user, $model);
    }

    public function forceDelete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::forceDelete($user, $model);
    }

    public function restore(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::restore($user, $model);
    }

    public function update(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::update($user, $model);
    }

    public function view(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::view($user, $model);
    }
}
