<?php namespace GeneaLabs\LaravelGovernor\Tests;

use App\Exceptions\Handler;
use Exception;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use DatabaseMigrations;

    protected $oldExceptionHandler;

    protected function setUp()
    {
        parent::setUp();

        ini_set('error_reporting', E_ALL);
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
        $this->withoutExceptionHandling();
        $this->artisan('make:auth', ['--no-interaction' => true]);
        $this->artisan('db:seed', [
            '--class' => 'LaravelGovernorDatabaseSeeder',
            '--no-interaction' => true
        ]);
    }

    protected function withoutExceptionHandling()
    {
        $this->oldExceptionHandler = $this->app->make(ExceptionHandler::class);
        $this->app->instance(ExceptionHandler::class, new class extends Handler {
            public function __construct()
            {
                //
            }

            public function report(Exception $exception)
            {
                //
            }

            public function render($request, Exception $exception)
            {
                throw $exception;
            }
        });

        return $this;
    }

    protected function withExceptionHandling()
    {
        $this->app->instance(ExceptionHandler::class, $this->oldExceptionHandler);

        return $this;
    }
}
