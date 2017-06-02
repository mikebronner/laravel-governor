[![Latest StableVersion](https://poser.pugx.org/genealabs/laravel-governor/v/stable.png)](https://packagist.org/packages/genealabs/laravel-governor)
[![Total Downloads](https://poser.pugx.org/genealabs/laravel-governor/downloads.png)](https://packagist.org/packages/genealabs/laravel-governor)
[![Build Status](https://ci.genealabs.com/build-status/image/1)](https://ci.genealabs.com/build-status/view/1)
[Code Coverate Report](https://ci.genealabs.com/coverage/1)


![governor for laravel](https://cloud.githubusercontent.com/assets/1791050/9620997/05b36650-50d6-11e5-864b-f15bd9622d08.jpg)

## Goal
Provide a simple method of managing ACL in a Laravel application built on the Laravel Authorization functionality.
By leveraging Laravel's native Authorization functionality there is no additional learning or implementation curve. All
you need to know is Laravel, and you will know how to use Governor for Laravel.

## Requirements
- PHP >=7.0.0
- Laravel 5.1, or 5.4
- Bootstrap 3 (included in your layout file)
- FontAwesome 4 (included in your layout file)

## Installation
The user with the lowest primary key will be set up as the SuperAdmin. If you're starting on a new project, be sure to
 add an initial user now. If you already have users, you can update the role-user entry to point to your intended user,
 if the first user is not the intended SuperAdmin. Now let's get the package installed.

### Laravel 5.2.x Only:
```sh
composer require genealabs/laravel-governor:~0.3.0
```

Make sure to add the following to your `/config/auth.php`:
```php
    'model' => App\User::class,
```

This is needed in addition to the existing, in the event of custom user providers:
```php
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],
```

### Laravel 5.0.x and 5.1.x Only:
```sh
composer require genealabs/laravel-governor:~0.2.0
```

### All Versions
And then add the service providers and aliases to your app.php config file:
```php
	// 'providers' => [
		GeneaLabs\LaravelGovernor\Providers\LaravelGovernorServiceProvider::class,
    // ],
```

Before we can get started, we need to update the database by running the migrations and data seeders:
```sh
php artisan migrate --path=vendor/genealabs/laravel-governor/database/migrations
php artisan db:seed --class=LaravelGovernorDatabaseSeeder
```

Now we need to make the assets and configuration available:
```sh
php artisan vendor:publish --tag=genealabs-laravel-governor --force
```

Lastly, add the Governable trait to the User model of your app:
```php
use GeneaLabs\LaravelGovernor\Traits\Governable;
//use GeneaLabs\LaravelImpersonator\Traits\Impersonatable;
//use Illuminate\Notifications\Notifiable;
//use Illuminate\Foundation\Auth\User as Authenticatable;

//class User extends Authenticatable
//{
    use Governable;
```

## Implementation
### Assets
Assets will need to be published for the forms to work correctly:

```sh
php artisan governor:publish --assets
```

__TBD: how to implement assets in layout view.__

### Configuration
The default configuration is as follows:

```php
'layoutView' => 'layouts.app',
'contentSection' => 'content',
'displayNameField' => 'name',
'authModel' => config('auth.model') ?? config('auth.providers.users.model'),
```

If you need to make any changes to this, publish the configuration file

```sh
php artisan governor:publish --config
```

and make any necessary changes. (We don't recommend publishing the config file
if you don't need to make any changes.)

### Views
If you would like to customize the views, publish them first:

```sh
php artisan governor:publish --views
```

After that you can edit them in `resources\views\vendor\genealabs\laravel-governor`.

### Policies
Policies are now auto-detected and automatically added to the entities list. You
 will no longer need to manage Entities manually. New policies will be available
 for role assignment when editing roles.

### Tables
Tables will automatically be updated with a `created_by` column that references
 the user that created the entry. There is no more need to run separate
 migrations or work around packages that have models without a created_by
 property.

### Admin Views
The easiest way to integrate Governor for Laravel into your app is to add the menu items to the relevant section of your
 app's menu (make sure to restrict access appropriately using the Laravel Authorization methods). The following routes
 can be added:
- Role Management: `genealabs.laravel-governor.roles.index`
- User-Role Assignments: `genealabs.laravel-governor.assignments.index`

### 403 Unauthorized
We recommend making a custom 403 error page to let the user know they don't have access. Otherwise the user will just
see the Symfony Whoops error message.

## Examples
### Policy
```php
<?php namespace App\Policies;

use App\MyModel;
use App\User;
use GeneaLabs\LaravelGovernor\Policies\LaravelGovernorPolicy;

class MyModelPolicy extends LaravelGovernorPolicy
{
    public function create(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'create', 'myModel', $myModel->created_by);
    }

    public function edit(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'edit', 'myModel', $myModel->created_by);
    }

    public function view(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'view', 'myModel', $myModel->created_by);
    }

    public function inspect(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'inspect', 'myModel', $myModel->created_by);
    }

    public function remove(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'remove', 'myModel', $myModel->created_by);
    }
}
```

### Config
```php
<?php

return [
    'layoutView' => 'genealabs-laravel-governor::layout',
    'bladeContentSection' => 'content',
    'displayNameField' => 'name',
];
```
