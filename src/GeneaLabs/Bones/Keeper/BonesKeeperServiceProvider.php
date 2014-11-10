<?php namespace GeneaLabs\Bones\Keeper;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;
use \Illuminate\Support\ServiceProvider;

class BonesKeeperServiceProvider extends ServiceProvider {

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
        $this->package('genealabs/bones-keeper', null, __DIR__ . '/../../..');
        $listeners = $this->app['config']->get('bones-keeper::eventListeners');
        foreach ($listeners as $event => $listener) {
            $this->app['events']->listen($event, $listener);
        }
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
		return array();
	}
}
