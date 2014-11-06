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
        View::addNamespace('genealabs/bones-keeper', __DIR__ . '/views');
        Config::addNamespace('genealabs/bones-keeper', __DIR__ . '/config');
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
        $this->package('genealabs/bones-keeper');
        $this->app['config']->package('genealabs/bones-keeper', __DIR__ . '/config');

        include_once(__DIR__ . '/routes.php');
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
