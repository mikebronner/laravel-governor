<?php namespace GeneaLabs\LaravelGovernor\Tests;

use GeneaLabs\LaravelGovernor\Providers\Auth;
use GeneaLabs\LaravelGovernor\Providers\Route;
use GeneaLabs\LaravelGovernor\Providers\Service;
use Illuminate\Contracts\Console\Kernel;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $this->addAuthRoutes();
        $app = require(__DIR__ . '/../vendor/laravel/laravel/bootstrap/app.php');
        $app->make(Kernel::class)->bootstrap();
        $app->register(Service::class);
        $app->register(Route::class);
        $app->register(Auth::class);

        return $app;
    }

    protected function addAuthRoutes()
    {
        $routes = file_get_contents(__DIR__ . '/../vendor/laravel/laravel/routes/web.php');
        $routes .= "\r\nAuth::routes();\r\n";
        file_put_contents(__DIR__ . '/../vendor/laravel/laravel/routes/web.php', $routes);
    }
}
