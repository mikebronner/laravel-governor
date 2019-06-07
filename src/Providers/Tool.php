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
            \GeneaLabs\LaravelGovernor\Nova\Action::$model = config("genealabs-laravel-governor.models.action");
            \GeneaLabs\LaravelGovernor\Nova\Assignment::$model = config("genealabs-laravel-governor.models.assignment");
            \GeneaLabs\LaravelGovernor\Nova\Entity::$model = config("genealabs-laravel-governor.models.entity");
            \GeneaLabs\LaravelGovernor\Nova\Group::$model = config("genealabs-laravel-governor.models.group");
            \GeneaLabs\LaravelGovernor\Nova\Ownership::$model = config("genealabs-laravel-governor.models.ownership");
            \GeneaLabs\LaravelGovernor\Nova\Permission::$model = config("genealabs-laravel-governor.models.permission");
            \GeneaLabs\LaravelGovernor\Nova\Role::$model = config("genealabs-laravel-governor.models.role");
            \GeneaLabs\LaravelGovernor\Nova\Team::$model = config("genealabs-laravel-governor.models.team");
            \GeneaLabs\LaravelGovernor\Nova\TeamInvitation::$model = config("genealabs-laravel-governor.models.invitation");
            \GeneaLabs\LaravelGovernor\Nova\User::$model = config("genealabs-laravel-governor.models.auth");
            \Laravel\Nova\Nova::serving(function (ServingNova $event) {
                \Laravel\Nova\Nova::resources([
                    \GeneaLabs\LaravelGovernor\Nova\Action::class,
                    \GeneaLabs\LaravelGovernor\Nova\Assignment::class,
                    \GeneaLabs\LaravelGovernor\Nova\Entity::class,
                    \GeneaLabs\LaravelGovernor\Nova\Group::class,
                    \GeneaLabs\LaravelGovernor\Nova\Ownership::class,
                    \GeneaLabs\LaravelGovernor\Nova\Permission::class,
                    \GeneaLabs\LaravelGovernor\Nova\Role::class,
                    \GeneaLabs\LaravelGovernor\Nova\User::class,
                    \GeneaLabs\LaravelGovernor\Nova\Team::class,
                    \GeneaLabs\LaravelGovernor\Nova\TeamInvitation::class,
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
