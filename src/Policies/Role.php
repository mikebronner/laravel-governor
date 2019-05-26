<?php namespace GeneaLabs\LaravelGovernor\Policies;

use Illuminate\Database\Eloquent\Model;

class Role extends BasePolicy
{
    public function delete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::delete($user, $Model);
    }

    public function forceDelete(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::forceDelete($user, $Model);
    }

    public function restore(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::restore($user, $Model);
    }

    public function update(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::update($user, $Model);
    }

    public function view(Model $user, Model $model) : bool
    {
        if ($model->name === "SuperAdmin") {
            return false;
        }

        return parent::view($user, $Model);
    }

}
