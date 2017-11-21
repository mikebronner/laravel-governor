<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Support\Facades\Schema;

class CreatedListener
{
    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        if (Schema::hasTable('roles')) {
            foreach ($models as $model) {
                if (get_class($model) === config('genealabs-laravel-governor.auth-model')) {
                    $model->roles()->attach('Member');
                }
            }
        }
    }
}
