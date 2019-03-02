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
        $this->artisan('migrate')
            ->run();

        // (new DatabaseSeeder)->call(new LaravelGovernorDatabaseSeeder);
        // $this->artisan('make:auth', ['--no-interaction' => true]);
        // $this->artisan('db:seed', [
        //     '--class' => 'LaravelGovernorDatabaseSeeder',
        //     '--no-interaction' => true
        // ]);
        // $this->withoutExceptionHandling();
    }

    protected function getPackageProviders($app)
    {
        return [
            'GeneaLabs\LaravelGovernor\Providers\Service',
            'GeneaLabs\LaravelGovernor\Providers\Auth',
            'GeneaLabs\LaravelGovernor\Providers\Route',
            // 'GeneaLabs\LaravelGovernor\Providers\Tool',
        ];
    }

    protected function getEnvironmentSetUp($app)
    {
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
