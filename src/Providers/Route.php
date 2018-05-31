<?php namespace GeneaLabs\LaravelGovernor\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class Route extends ServiceProvider
{
    protected $namespace = 'GeneaLabs\LaravelGovernor\Http\Controllers';

    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    protected function mapWebRoutes()
    {
        app("router")
            ->prefix(config('genealabs-laravel-governor.url-prefix'))
            ->middleware('web')
            ->as('genealabs.laravel-governor.')
            ->namespace($this->namespace)
            ->group(__DIR__ . '/../../routes/web.php');
    }

    protected function mapApiRoutes()
    {
        app("router")
            ->prefix('api' . config('genealabs-laravel-governor.url-prefix'))
            ->middleware(['api', "auth:api"])
            ->namespace($this->namespace . "\Api")
            ->group(__DIR__ . '/../../routes/api.php');
    }
}
