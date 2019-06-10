<?php namespace GeneaLabs\LaravelGovernor\Tests;

use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Policies\Author as AuthorPolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Policies\User as UserPolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use Illuminate\Support\Facades\Gate;

trait CreatesApplication
{
    protected function getEnvironmentSetUp($app)
    {
        Gate::policy(Author::class, AuthorPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
        
        $app['config']->set('database.default', 'testing');
        $app['config']->set('genealabs-laravel-governor.models.auth', User::class);
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
    
    protected function getPackageProviders($app)
    {
        return [
            'GeneaLabs\LaravelGovernor\Providers\Service',
            'GeneaLabs\LaravelGovernor\Providers\Auth',
            'GeneaLabs\LaravelGovernor\Providers\Route',
            'GeneaLabs\LaravelGovernor\Providers\Nova',
        ];
    }
    
    protected function setUp() : void
    {
        parent::setUp();
        
        $this->withFactories(__DIR__ . "/database/factories");
        $this->loadLaravelMigrations();
        $this->loadMigrationsFrom(__DIR__ . "/../database/migrations");
        $this->loadMigrationsFrom(__DIR__ . "/database/migrations");
        $this->artisan('migrate');
        $this->artisan('db:seed', [
            '--class' => 'LaravelGovernorDatabaseSeeder',
            '--no-interaction' => true
            ]);
        }
    }
    