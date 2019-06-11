<?php namespace GeneaLabs\LaravelGovernor\Tests\Unit\Providers;

use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Support\Facades\Gate;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Policies\Author as AuthorPolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Policies\User as UserPolicy;

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
