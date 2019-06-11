<?php namespace GeneaLabs\LaravelGovernor\Tests;

use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use Orchestra\Testbench\TestCase as BaseTestCase;

class AlwaysRunFirstTest extends BaseTestCase
{
    protected function getPackageProviders($app)
    {
        return [
            'GeneaLabs\LaravelGovernor\Providers\Service',
            'GeneaLabs\LaravelGovernor\Providers\Auth',
            'GeneaLabs\LaravelGovernor\Providers\Route',
            'GeneaLabs\LaravelGovernor\Providers\Nova',
        ];
    }

    protected function resolveApplicationBootstrappers($app)
    {
        shell_exec("cd " . __DIR__ . "/database && rm *.sqlite && touch database.sqlite");

        $app['config']->set('genealabs-laravel-governor.models', [
            'auth' => User::class,
            'action' => \GeneaLabs\LaravelGovernor\Action::class,
            'assignment' => \GeneaLabs\LaravelGovernor\Assignment::class,
            'entity' => \GeneaLabs\LaravelGovernor\Entity::class,
            'group' => \GeneaLabs\LaravelGovernor\Group::class,
            'ownership' => \GeneaLabs\LaravelGovernor\Ownership::class,
            'permission' => \GeneaLabs\LaravelGovernor\Permission::class,
            'role' => \GeneaLabs\LaravelGovernor\Role::class,
            'team' => \GeneaLabs\LaravelGovernor\Team::class,
            'invitation' => \GeneaLabs\LaravelGovernor\TeamInvitation::class,
        ]);
        $app['config']->set('database.default', 'sqlite');
        $app['config']->set('database.connections.sqlite', [
            'driver' => 'sqlite',
            "url" => null,
            'database' => __DIR__ . '/database/database.sqlite',
            'prefix' => '',
            "foreign_key_constraints" => false,
        ]);

        parent::resolveApplicationBootstrappers($app);
    }

    public function setUp() : void
    {
        parent::setUp();

        $this->loadLaravelMigrations();
        $this->loadMigrationsFrom(__DIR__ . "/../database/migrations");
        $this->loadMigrationsFrom(__DIR__ . "/database/migrations");
        $this->artisan('migrate');
        $this->artisan('db:seed', [
            "--database" => "sqlite",
            '--class' => 'LaravelGovernorDatabaseSeeder',
            '--no-interaction' => true,
        ]);
    }

    /** @test */
    public function migrateAndInstallTheDatabase()
    {
        $this->assertTrue(true);
    }
}
