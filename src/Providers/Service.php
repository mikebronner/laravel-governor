<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelCasts\Providers\Service as LaravelCastsService;
use GeneaLabs\LaravelGovernor\Console\Commands\Publish;
use GeneaLabs\LaravelGovernor\Listeners\CreatedInvitationListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatedListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatingListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatedTeamListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatingInvitationListener;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Support\AggregateServiceProvider;

class Service extends AggregateServiceProvider
{
    protected $defer = false;
    protected $providers = [
        LaravelCastsService::class,
    ];

    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function boot(GateContract $gate)
    {
        $teamClass = config("genealabs-laravel-governor.models.team");
        $invitationClass = config("genealabs-laravel-governor.models.invitation");
        app('events')->listen('eloquent.created: *', CreatedListener::class);
        app('events')->listen('eloquent.creating: *', CreatingListener::class);
        app('events')->listen('eloquent.saving: *', CreatingListener::class);
        app('events')->listen("eloquent.created: {$invitationClass}", CreatedInvitationListener::class);
        app('events')->listen("eloquent.created: {$teamClass}", CreatedTeamListener::class);
        app('events')->listen("eloquent.creating: {$invitationClass}", CreatingInvitationListener::class);
        $this->publishes([
            __DIR__ . '/../../config/config.php' => config_path('genealabs-laravel-governor.php')
        ], 'config');
        $this->publishes([
            __DIR__ . '/../../public' => public_path('genealabs-laravel-governor')
        ], 'assets');
        $this->publishes([
            __DIR__ . '/../../resources/views' => base_path('resources/views/vendor/genealabs-laravel-governor')
        ], 'views');
        $this->publishes([
            __DIR__ . '/../../database/migrations' => base_path('database/migrations')
        ], 'migrations');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'genealabs-laravel-governor');
    }

    public function register()
    {
        parent::register();

        $this->mergeConfigFrom(__DIR__ . '/../../config/config.php', 'genealabs-laravel-governor');
        $this->commands(Publish::class);
    }

    public function provides() : array
    {
        return [];
    }
}
