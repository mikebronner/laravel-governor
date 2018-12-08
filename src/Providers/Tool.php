<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelGovernor\Http\Middleware\Authorize;
use GeneaLabs\LaravelGovernor\Nova\Assignment;
use GeneaLabs\LaravelGovernor\Nova\Ownership;
use GeneaLabs\LaravelGovernor\Nova\Permission;
use GeneaLabs\LaravelGovernor\Nova\Role;
use GeneaLabs\LaravelGovernor\Nova\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;
use GeneaLabs\LaravelGovernor\Nova\Action;
use GeneaLabs\LaravelGovernor\Nova\Entity;

class Tool extends ServiceProvider
{
    protected $namespace = 'GeneaLabs\LaravelGovernor\Http\Controllers';

    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'genealabs-laravel-governor');

        $this->app->booted(function () {
            $this->routes();
        });

        User::$model = config("genealabs-laravel-governor.auth-model");

        Nova::serving(function (ServingNova $event) {
            Nova::resources([
                Action::class,
                Assignment::class,
                Entity::class,
                Ownership::class,
                Permission::class,
                Role::class,
                User::class,
            ]);
        });
    }

    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova', Authorize::class])
            ->prefix("genealabs/laravel-governor/nova")
            ->namespace($this->namespace . "\Nova")
            ->group(__DIR__ . '/../../routes/nova.php');
    }

    public function register()
    {
        //
    }
}
