<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelCasts\Providers\LaravelCastsService;
use GeneaLabs\LaravelGovernor\Listeners\CreatedListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatingListener;
use GeneaLabs\LaravelGovernor\Http\ViewComposers\Layout;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Support\AggregateServiceProvider;

class LaravelGovernorServiceProvider extends AggregateServiceProvider
{
    protected $defer = false;
    protected $policies = [
        'GeneaLabs\LaravelGovernor\Action' => 'GeneaLabs\LaravelGovernor\Policies\ActionPolicy',
        'GeneaLabs\LaravelGovernor\Assignment' => 'GeneaLabs\LaravelGovernor\Policies\AssignmentPolicy',
        'GeneaLabs\LaravelGovernor\Entity' => 'GeneaLabs\LaravelGovernor\Policies\EntityPolicy',
        'GeneaLabs\LaravelGovernor\Ownership' => 'GeneaLabs\LaravelGovernor\Policies\OwnershipPolicy',
        'GeneaLabs\LaravelGovernor\Permission' => 'GeneaLabs\LaravelGovernor\Policies\PermissionPolicy',
        'GeneaLabs\LaravelGovernor\Role' => 'GeneaLabs\LaravelGovernor\Policies\RolePolicy',
    ];
    protected $providers = [
        LaravelCastsService::class,
    ];

    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        if (! $this->app->routesAreCached()) {
            require __DIR__ . '/../../routes/web.php';
        }

        app('events')->listen('eloquent.creating: *', CreatingListener::class);
        app('events')->listen('eloquent.created: *', CreatedListener::class);

        $this->publishes([__DIR__ . '/../../config/config.php' => config_path('genealabs-laravel-governor.php')], 'config');
        $this->publishes([__DIR__ . '/../../public' => public_path('genealabs-laravel-governor')], 'assets');
        $this->publishes([__DIR__ . '/../../resources/views' => base_path('resources/views/vendor/genealabs-laravel-governor')], 'views');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'genealabs-laravel-governor');
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
    }

    public function register()
    {
        parent::register();

        $this->mergeConfigFrom(__DIR__ . '/../../config/config.php', 'genealabs-laravel-governor');
    }

    public function registerPolicies(GateContract $gate)
    {
        foreach ($this->policies as $key => $value) {
            $gate->policy($key, $value);
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['genealabs-laravel-governor'];
    }
}
