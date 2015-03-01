<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;
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
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        include_once(__DIR__ . '/../../../routes.php');
        $listeners = $this->app['config']->get('genealabs.bones-keeper.eventListeners');
        foreach ($listeners as $event => $listener) {
            $this->app['events']->listen($event, $listener);
        }
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
