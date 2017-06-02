<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    /**
     * Add new users to Member role.
     *
     * @param Model $event
     */
    public function handle(string $event, array $models)
    {
        foreach ($models as $model) {
            if (get_class($model) === config('genealabs-laravel-governor.authModel')) {
                $model->roles()->attach('Member');
            }
        }
    }
}
