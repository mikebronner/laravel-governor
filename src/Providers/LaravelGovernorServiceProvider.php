<?php namespace GeneaLabs\LaravelGovernor\Providers;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class LaravelGovernorServiceProvider extends ServiceProvider
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

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot(GateContract $gate)
    {
        parent::registerPolicies($gate);

        if (! $this->app->routesAreCached()) {
            require __DIR__ . '/../Http/routes.php';
        }

        $this->publishes([__DIR__ . '/../../config/config.php' => config_path('genealabs-bones-keeper.php')], 'genealabs-bones-keeper');
        $this->publishes([__DIR__ . '/../../public' => public_path('genealabs/bones-keeper')], 'genealabs-bones-keeper');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'genealabs-bones-keeper');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['genealabs-bones-keeper'];
    }
}
