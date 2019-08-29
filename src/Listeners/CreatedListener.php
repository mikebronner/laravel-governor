<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreatedListener
{
    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        if (! Str::contains($event, "Hyn\Tenancy\Models\Website")
            && ! Str::contains($event, "Hyn\Tenancy\Models\Hostname")
            && Schema::hasTable('roles')
        ) {
            collect($models)
                ->filter(function ($model) {
                    return $model instanceof Model;
                })
                ->each(function ($model) {
                    if (get_class($model) === config('genealabs-laravel-governor.models.auth')) {
                        $model->roles()->attach('Member');
                    }
                });
        }
    }
}
