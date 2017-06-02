<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    public function handle(string $event, array $models)
    {
        $event = $event; // stupid workaround when not using all parameters.

        foreach ($models as $model) {
            if (get_class($model) === config('genealabs-laravel-governor.authModel')) {
                $model->roles()->attach('Member');
            }
        }
    }
}
