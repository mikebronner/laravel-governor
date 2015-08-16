<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Support\ServiceProvider;

class BonesKeeperServiceProvider extends ServiceProvider
{

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        if (! $this->app->routesAreCached()) {
            require __DIR__ . '/../../../routes.php';
        }

        $this->publishes([__DIR__ . '/../../../config/config.php' => config_path('/genealabs/bones-keeper.php')], 'genealabs-bones-keeper');
        $this->publishes([
            __DIR__ . '/../../../../public' => public_path('genealabs/bones-keeper')], 'genealabs-bones-keeper');
        $this->loadViewsFrom(__DIR__.'/../../../views', 'genealabs-bones-keeper');
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
