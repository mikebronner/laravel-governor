<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    /**
     * Add new users to Member role.
     *
     * @param Model $event
     */
    public function handle(Model $model)
    {
        if (get_class($model) === config('auth.model')) {
            $model->roles()->attach('Member');
        }
    }
}
