<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function handle(string $event, array $models)
    {
        foreach ($models as $model) {
            if (get_class($model) === config('genealabs-laravel-governor.auth-model')) {
                $model->roles()->attach('Member');
            }
        }
    }
}
