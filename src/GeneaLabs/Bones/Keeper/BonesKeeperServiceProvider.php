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
        $this->publishes([
            __DIR__ . '/../../../config/config.php' => config_path('/genealabs/bones-keeper.php'),
        ]);
        $this->publishes([
            __DIR__ . '/../../../../public' => public_path('genealabs/bones-keeper'),
        ], 'public');
        $this->loadViewsFrom(__DIR__.'/../../../views', 'bones-keeper');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        include_once(__DIR__ . '/../../../routes.php');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}
