<?php namespace GeneaLabs\LaravelGovernor\Tests;

use GeneaLabs\LaravelGovernor\Providers\Service as LaravelGovernorService;
use GeneaLabs\LaravelGovernor\Tests\App\User;
use Orchestra\Database\ConsoleServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

trait CreatesApplication
{
    public function setUp()
    {
        parent::setUp();

        $this->withFactories(__DIR__ . '/database/factories');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadMigrationsFrom(__DIR__ . '../database/migrations');
        // $this->loadViewsFrom(__DIR__ . '/resources/views');

// dd(config('views.paths'));
        // dd(app('router')->getRoutes());
    }

    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    protected function getPackageProviders($app)
    {
        config(['genealabs-laravel-governor.auth-model' => User::class]);
        config(['session.expire_on_close' => true]);
        config(['view.paths' => [__DIR__ . '/resources/views']]);

        Route::get('login', ["as" => "login", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\LoginController@showLoginForm"]);
        Route::post('login', ["as" => "login", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\LoginController@login"]);
        Route::post('logout', ["as" => "logout", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\LoginController@logout"]);
        Route::get('register', ["as" => "register", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\RegisterController@showRegistrationForm"]);
        Route::post('register', ["as" => "register", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\RegisterController@register"]);
        Route::get('password/reset', ["as" => "password.request", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm"]);
        Route::post('password/email', ["as" => "password.email", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail"]);
        Route::get('password/reset/{token}', ["as" => "password.reset", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\ResetPasswordController@showResetForm"]);
        Route::post('password/reset', ["as" => "password.reset", "uses" => "\GeneaLabs\LaravelGovernor\Tests\App\Http\Controllers\Auth\ResetPasswordController@reset"]);

        return [
            LaravelGovernorService::class,
            ConsoleServiceProvider::class,
        ];
    }
}
