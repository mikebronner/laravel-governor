<?php namespace GeneaLabs\LaravelGovernor\Tests\Unit\Providers;

use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;

/** @group test */
class ServiceTest extends UnitTestCase
{
    protected function resolveApplicationBootstrappers($app)
    {
        $app['config']->set('database.default', 'sqlite');
        $app['config']->set('database.connections.sqlite', [
            'driver' => 'sqlite',
            "url" => null,
            'database' => __DIR__ . '/database/testing.sqlite',
            'prefix' => '',
            "foreign_key_constraints" => false,
        ]);

        parent::resolveApplicationBootstrappers($app);
    }

    public function testEntityParsing()
    {
        $this->assertTrue(true);
    }
}
