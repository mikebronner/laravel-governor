# Governor for Laravel
Managing policy and control in Laravel.

[![Build Status](https://travis-ci.org/GeneaLabs/laravel-governor.svg?branch=master)](https://travis-ci.org/GeneaLabs/laravel-governor)

## Before You Get Started
- You must have at least 1 (one) user in your users table. The user with the lowest ID will become your admin by default. This can be changed after the installation, of course.
- You must add a `created_by` column to each of your tables. For example:
  ```php
  
  ```
- You must save the user's ID to the respective created_by field in the `store` methods of your controllers.

## Installation
```sh
composer require genealabs/laravel-governor:^0.1.0
```

And then add the service provider to your app.php config file:
```php
	// 'providers' => [
		GeneaLabs\LaravelGovernor\Providers\LaravelGovernorServiceProvider::class,
    // ];
```

Before we can get started, we need to update the database by running the migrations and data seeders:
```php
php artisan migrate --path=vendor/genealabs/laravel-governor/src/migrations
php artisan db:seed --class=LaravelGovernorDatabaseSeeder
```

Now we need to make the assets and configuration available:
```php
php artisan vendor:publish --flag=genealabs-laravel-governor
```

More tba ...
