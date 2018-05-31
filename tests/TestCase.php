<?php namespace GeneaLabs\LaravelGovernor\Tests;

use App\Exceptions\Handler;
use Exception;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    // use DatabaseMigrations;
    use RefreshDatabase;

    protected $oldExceptionHandler;

    protected function setUp()
    {
        parent::setUp();

        // $this->artisan("migrate:fresh");
        // $this->artisan("migrate", [
        //     "--path" => __DIR__ . "/database/migrations",
        // ]);

        $this->artisan('make:auth', ['--no-interaction' => true]);
        $this->artisan('db:seed', [
            '--class' => 'LaravelGovernorDatabaseSeeder',
            '--no-interaction' => true
        ]);
        $this->withoutExceptionHandling();
    }
}
