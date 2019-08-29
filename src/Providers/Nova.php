<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelGovernor\Http\Middleware\Authorize;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;

class Nova extends ServiceProvider
{
    protected $namespace = 'GeneaLabs\LaravelGovernor\Http\Controllers';

    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'genealabs-laravel-governor');

        $this->app->booted(function () {
            $this->routes();
        });

        if (class_exists("Laravel\Nova\Resource")) {
            \GeneaLabs\LaravelGovernor\Nova\GovernorAction::$model = config("genealabs-laravel-governor.models.action");
            \GeneaLabs\LaravelGovernor\Nova\GovernorAssignment::$model = config("genealabs-laravel-governor.models.assignment");
            \GeneaLabs\LaravelGovernor\Nova\GovernorEntity::$model = config("genealabs-laravel-governor.models.entity");
            \GeneaLabs\LaravelGovernor\Nova\GovernorGroup::$model = config("genealabs-laravel-governor.models.group");
            \GeneaLabs\LaravelGovernor\Nova\GovernorOwnership::$model = config("genealabs-laravel-governor.models.ownership");
            \GeneaLabs\LaravelGovernor\Nova\GovernorPermission::$model = config("genealabs-laravel-governor.models.permission");
            \GeneaLabs\LaravelGovernor\Nova\GovernorRole::$model = config("genealabs-laravel-governor.models.role");
            \GeneaLabs\LaravelGovernor\Nova\GovernorTeam::$model = config("genealabs-laravel-governor.models.team");
            \GeneaLabs\LaravelGovernor\Nova\GovernorTeamInvitation::$model = config("genealabs-laravel-governor.models.invitation");
            \GeneaLabs\LaravelGovernor\Nova\GovernorUser::$model = config("genealabs-laravel-governor.models.auth");
            \Laravel\Nova\Nova::serving(function (ServingNova $event) {
                \Laravel\Nova\Nova::script('genealabs-laravel-governor', __DIR__ . '/../../dist/js/tool.js');
                \Laravel\Nova\Nova::style('genealabs-laravel-governor', __DIR__ . '/../../dist/css/tool.css');
                \Laravel\Nova\Nova::resources([
                    \GeneaLabs\LaravelGovernor\Nova\GovernorAction::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorAssignment::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorEntity::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorGroup::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorOwnership::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorPermission::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorRole::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorUser::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorTeam::class,
                    \GeneaLabs\LaravelGovernor\Nova\GovernorTeamInvitation::class,
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
