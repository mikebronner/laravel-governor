<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelGovernor\Http\Middleware\Authorize;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;

class Tool extends ServiceProvider
{
    protected $namespace = 'GeneaLabs\LaravelGovernor\Http\Controllers';

    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'genealabs-laravel-governor');

        $this->app->booted(function () {
            $this->routes();
        });

        if (class_exists("Laravel\Nova\Resource")) {
            \GeneaLabs\LaravelGovernor\Nova\User::$model = config("genealabs-laravel-governor.models.auth");
            \Laravel\Nova\Nova::serving(function (ServingNova $event) {
                \Laravel\Nova\Nova::resources([
                    \GeneaLabs\LaravelGovernor\Nova\Action::class,
                    \GeneaLabs\LaravelGovernor\Nova\Assignment::class,
                    \GeneaLabs\LaravelGovernor\Nova\Entity::class,
                    \GeneaLabs\LaravelGovernor\Nova\Ownership::class,
                    \GeneaLabs\LaravelGovernor\Nova\Permission::class,
                    \GeneaLabs\LaravelGovernor\Nova\Role::class,
                    \GeneaLabs\LaravelGovernor\Nova\User::class,
                ]);
            });
        }
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
