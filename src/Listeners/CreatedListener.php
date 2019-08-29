<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;

class CreatedListener
{
    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        if (str_contains($event, "Hyn\Tenancy\Models\Website")
            || str_contains($event, "Hyn\Tenancy\Models\Hostname")
        ) {
            return;
        }

        collect($models)
            ->filter(function ($model) {
                return $model instanceof Model
                    && get_class($model) === config('genealabs-laravel-governor.models.auth');
            })
            ->each(function ($model) {
                try {
                    $model->roles()->syncWithoutDetaching('Member');
                } catch (Exception $exception) {
                    $roleClass = config("genealabs-laravel-governor.models.role");
                    (new $roleClass)->firstOrCreate([
                        'name' => 'Member',
                        'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
                    ]);
                    $model->roles()->attach('Member');
                }
            });
    }
}
