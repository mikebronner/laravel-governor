<?php namespace GeneaLabs\LaravelGovernor\Tests;

use Orchestra\Testbench\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    // use CreatesApplication;
    // use RefreshDatabase;
    // use DatabaseMigrations;

    protected $oldExceptionHandler;

    protected function setUp() : void
    {
        parent::setUp();

        $this->loadLaravelMigrations();
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
        $this->artisan("db:seed --class=LaravelGovernorDatabaseSeeder");
    }

    protected function getPackageAliases($app)
    {
        return [
            'Str' => 'Illuminate\Support\Str',
        ];
    }

    protected function getPackageProviders($app)
    {
        return [
            'GeneaLabs\LaravelGovernor\Providers\Service',
            'GeneaLabs\LaravelGovernor\Providers\Auth',
            'GeneaLabs\LaravelGovernor\Providers\Route',
        ];
    }

    protected function getEnvironmentSetUp($app)
    {
        $app["config"]->set('genealabs-laravel-governor.layout-view', "genealabs-laravel-governor::layouts.app");
        $app["router"]->get('login', 'Auth\LoginController@showLoginForm')->name('login');
        $app["router"]->post('login', 'Auth\LoginController@login');
        $app["router"]->post('logout', 'Auth\LoginController@logout')->name('logout');
        $app["router"]->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
        $app["router"]->post('register', 'Auth\RegisterController@register');
        $app["router"]->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
        $app["router"]->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
        $app["router"]->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
        $app["router"]->post('password/reset', 'Auth\ResetPasswordController@reset');
    }
}
