<?php namespace GeneaLabs\LaravelGovernor\Tests;

use GeneaLabs\LaravelGovernor\Providers\LaravelGovernorServiceProvider;
use Orchestra\Testbench\TestCase as BaseTest;

class TestCase extends BaseTest
{
    protected function getPackageProviders($app)
    {
        return [
            LaravelGovernorServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app)
    {
        // Setup default database to use sqlite :memory:
        $app['config']->set('database.default', 'testbench');
        $app['config']->set('database.connections.testbench', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);
    }

    public function setUp()
    {
        parent::setUp();

    }
}
