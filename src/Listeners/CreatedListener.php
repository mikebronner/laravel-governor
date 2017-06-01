<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    /**
     * Add new users to Member role.
     *
     * @param Model $event
     */
    public function handle($model)
    {
        if (is_string($model)) {
            $model = collect(explode(': ', $model))->last();
            $model = new $model;
        }

        if (get_class($model) === config('genealabs-laravel-governor.authModel')) {
            $model->roles()->attach('Member');
        }
    }
}
