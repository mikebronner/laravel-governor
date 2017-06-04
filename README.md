[![Latest StableVersion](https://poser.pugx.org/genealabs/laravel-governor/v/stable.png)](https://packagist.org/packages/genealabs/laravel-governor)
[![Total Downloads](https://poser.pugx.org/genealabs/laravel-governor/downloads.png)](https://packagist.org/packages/genealabs/laravel-governor)
[![Build Status](https://ci.genealabs.com/build-status/image/1)](https://ci.genealabs.com/build-status/view/2)
[Code Coverate Report](https://ci.genealabs.com/coverage/2)

# Governor For Laravel

![governor for laravel](https://cloud.githubusercontent.com/assets/1791050/9620997/05b36650-50d6-11e5-864b-f15bd9622d08.jpg)

## Goal
Provide a simple method of managing ACL in a Laravel application built on the
 Laravel Authorization functionality. By leveraging Laravel's native
 Authorization functionality there is no additional learning or implementation
 curve. All you need to know is Laravel, and you will know how to use Governor
 for Laravel.

## Requirements
- PHP >=7.0.0
- Laravel 5.4
- Bootstrap 3 (needs to be included in your layout file)
- FontAwesome 4 (needs to be included in your layout file)

## Installation
The user with the lowest primary key will be set up as the SuperAdmin. If you're
 starting on a new project, be sure to add an initial user now. If you already
 have users, you can update the role-user entry to point to your intended user,
 if the first user is not the intended SuperAdmin. Now let's get the package
 installed.
 
Install via composer:
```sh
composer require genealabs/laravel-governor
```

Add the service provider to your app.php config file:
```php
'providers' => [
// [...]
    GeneaLabs\LaravelGovernor\Providers\LaravelGovernorService::class,
// [...]
],
```

Before we can get started, we need to update the database by running the migrations and data seeders:
```sh
php artisan migrate
php artisan db:seed --class=LaravelGovernorDatabaseSeeder
```

Now we need to make the assets available:
```sh
php artisan governor:publish --assets
```

Lastly, add the Governable trait to the User model of your app:
```php
// [...]
use GeneaLabs\LaravelGovernor\Traits\Governable;

class User extends Authenticatable
{
    use Governable;
// [...]
```

## Implementation
### Configuration
If you need to make any changes (see Example selection below for the default
 config file) to the default configuration, publish the configuration file:

```sh
php artisan governor:publish --config
```

and make any necessary changes. (We don't recommend publishing the config file
if you don't need to make any changes.)

### Views
If you would like to customize the views, publish them:

```sh
php artisan governor:publish --views
```

and edit them in `resources\views\vendor\genealabs\laravel-governor`.

### Policies
Policies are now auto-detected and automatically added to the entities list. You
 will no longer need to manage Entities manually. New policies will be available
 for role assignment when editing roles. Check out the example policy in
 the Examples section below. See Laravel's documentation on how to create
 policies and check for them in code:
 https://laravel.com/docs/5.4/authorization#writing-policies

**Your policies must extend LaravelGovernorPolicy in order to function with
 Governor.** By default you do not need to include any of the methods, as they
 are implemented automatically and perform checks based on reflection. However,
 if you need to customize anything, you are free to override any of the `before`,
 `create`, `edit`, `view`, `inspect`, and `remove` methods.

#### Checking Authorization
To validate a user against a given policy, use one of the keywords that Governor
 validates against: `before`, `create`, `edit`, `view`, `inspect`, and `remove`.
 For example, if the desired policy to check has a class name of `BlogPostPolicy`,
 you would authorize your user with something like `$user->can('create', $blogPost)`.

### Tables
Tables will automatically be updated with a `created_by` column that references
 the user that created the entry. There is no more need to run separate
 migrations or work around packages that have models without a created_by
 property.

### Admin Views
The easiest way to integrate Governor for Laravel into your app is to add the
 menu items to the relevant section of your app's menu (make sure to restrict
 access appropriately using the Laravel Authorization methods). The following
 routes can be added:
- Role Management: `genealabs.laravel-governor.roles.index`
- User-Role Assignments: `genealabs.laravel-governor.assignments.index`

For example:
```php
<li><a href="{{ route('genealabs.laravel-governor.roles.index') }}">Governor</a></li>
```

### 403 Unauthorized
We recommend making a custom 403 error page to let the user know they don't have
 access. Otherwise the user will just see the default error message. See
 https://laravel.com/docs/5.4/errors#custom-http-error-pages for more details on
 how to set those up.

## Examples
### Config File
```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Layout Blade File
    |--------------------------------------------------------------------------
    |
    | This value is used to reference your main layout blade view to render
    | the views provided by this package. The layout view referenced here
    | should include Bootstrap 3 and FontAwesome 4 to work as intended.
    */
    'layout-view' => 'layouts.app',

    /*
    |--------------------------------------------------------------------------
    | Layout Content Section Name
    |--------------------------------------------------------------------------
    |
    | Specify the name of the section in the view referenced above that is
    | used to render the main page content. If this does not match, you
    | will only get blank pages when accessing views in Governor.
    */
    'content-section' => 'content',

    /*
    |--------------------------------------------------------------------------
    | Authorization Model
    |--------------------------------------------------------------------------
    |
    | Here you can customize what model should be used for authorization checks
    | in the event that you have customized your authentication processes.
    */
    'auth-model' => config('auth.providers.users.model') ?? config('auth.model'),

    /*
    |--------------------------------------------------------------------------
    | User Model Name Property
    |--------------------------------------------------------------------------
    |
    | This value is used to display your users when assigning them to roles.
    | You can choose any property of your auth-model defined above that is
    | exposed via JSON.
    */
    'user-name-property' => 'name',

    /*
    |--------------------------------------------------------------------------
    | URL Prefix
    |--------------------------------------------------------------------------
    |
    | If you want to change the URL used by the browser to access the admin
    | pages, you can do so here. Be careful to avoid collisions with any
    | existing URLs of your app when doing so.
    */
    'url-prefix' => '/genealabs/laravel-governor/',
];
```

### Policy
#### No Methods Required For Default Policies
Adding policies is crazily simple! All the work has been refactored out so all
 you need to worry about now is creating a policy class, and that's it!

```php
<?php namespace GeneaLabs\LaravelGovernor\Policies;

use GeneaLabs\LaravelGovernor\Interfaces\GovernablePolicy;

class MyPolicy extends LaravelGovernorPolicy
{
    // use default methods
}
```

#### Default Methods In A Policy Class
Adding any of the `before`, `create`, `edit`, `view`, `inspect`, and `remove`
 methods to your policy is only required if you want to customize a given method.

```php
<?php namespace App\Policies;

use App\MyModel;
use App\User;
use GeneaLabs\LaravelGovernor\Policies\LaravelGovernorPolicy;

class MyModelPolicy extends LaravelGovernorPolicy
{
    public function before($user)
    {
        return $user->isSuperAdmin ? true : null;
    }

    public function create(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'create', 'myModel', $myModel->governor_created_by);
    }

    public function edit(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'edit', 'myModel', $myModel->governor_created_by);
    }

    public function view(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'view', 'myModel', $myModel->governor_created_by);
    }

    public function inspect(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'inspect', 'myModel', $myModel->governor_created_by);
    }

    public function remove(User $user, MyModel $myModel)
    {
        return $this->validatePermissions($user, 'remove', 'myModel', $myModel->governor_created_by);
    }
}
```
