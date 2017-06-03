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
        $app = require(__DIR__ . '/../vendor/laravel/laravel/bootstrap/app.php');
        $app->make(Kernel::class)->bootstrap();
        $app->register(LaravelGovernorService::class);

        return $app;
    }
}
