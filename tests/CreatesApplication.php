<?php namespace GeneaLabs\LaravelGovernor\Tests;

use Illuminate\Contracts\Console\Kernel;
use GeneaLabs\LaravelGovernor\Providers\LaravelGovernorService;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $routes = file_get_contents(__DIR__ . '/../vendor/laravel/laravel/routes/web.php');
        $routes .= "\r\nAuth::routes();\r\n";
        file_put_contents(__DIR__ . '/../vendor/laravel/laravel/routes/web.php', $routes);

        $app = require(__DIR__ . '/../vendor/laravel/laravel/bootstrap/app.php');
        $app->make(Kernel::class)->bootstrap();
        $app->register(LaravelGovernorService::class);

        return $app;
    }
}
