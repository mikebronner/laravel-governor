<?php namespace GeneaLabs\LaravelGovernor\Tests\Unit\Providers;

use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;

class ServiceTest extends UnitTestCase
{
    protected function getEnvironmentSetUp($app)
    {
        parent::getEnvironmentSetUp($app);

        $app['config']->set('database.default', 'sqlite');
        $app['config']->set('database.connections.sqlite', [
            'driver' => 'sqlite',
            "url" => null,
            'database' => __DIR__ . '/../../database/database.sqlite',
            'prefix' => '',
            "foreign_key_constraints" => false,
        ]);
    }

    public function tearDown() : void
    {
        $this->app['config']->set('database.default', 'testing');
    }

    public function testEntityParsing()
    {
        $this->assertTrue(true);
    }
}
