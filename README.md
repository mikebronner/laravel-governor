![governor for laravel](https://cloud.githubusercontent.com/assets/1791050/9620997/05b36650-50d6-11e5-864b-f15bd9622d08.jpg)

## Overview
### Goal
Provide a simple method of managing ACL in a Laravel application built on the Laravel Authorization functionality.
By leveraging Laravel's native Authorization functionality there is no additional learning or implementation curve. All
you need to know is Laravel, and you will know how to use Governor for Laravel.

### Reasoning
I was looking for a straight-forward approach to ACL management that didn't require extensive customization, 
configuration, or even project rewrites. The following criteria shaped the development of this package:
- Provide drop-in capability, so you can equally add it to existing or new Laravel projects without issues.
- Allow granular access management, yet keep it simple to use.
- Provide an administrative front-end out-of-the box.

### Considerations
#### User Requirements
- You must have at least 1 (one) user in your users table. The user with the lowest ID will become your admin by default. 
  This can be changed after the installation, of course.

#### Tables
You must add a `created_by` column to each of your tables. I purposefully chose not to write a 'magical' migration that 
would do all this for you, as that could lead to problems. However, I have added such a migration at the end to give you
a solid starting point.

#### User Model
Your user model (most often `User.php`) should implement the Governable and Authorizable traits:
```php
<?php namespace App;

use GeneaLabs\LaravelGovernor\Governable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract 
{
    use Authenticatable;
    use Authorizable;
    use CanResetPassword;
    use Governable;
    
    // [...]
}
```

#### Models
The `create` methods in your models will automatically add the created_by user ID. To prevent this, add the following to
your models that do not have a `created_by` column in their table:
```php
    protected $isGoverned = false;
```

#### Routes
This package adds multiple routes under `genealabs/laravel-governor`. Please verify that these don't collide with any of
your existing routes.

#### Policies
Your policy classes must extend `GeneaLabs\LaravelGovernor\Policies\LaravelGovernorPolicy`, for example:
```php
<?php namespace App\Policies;

use GeneaLabs\LaravelGovernor\Policies\LaravelGovernorPolicy;

class MySecretSaucePolicy extends LaravelGovernorPolicy
{
    // [...]
}
```

## Features
Governor for Laravel takes full advantage of the Authorization functionality added to Laravel 5.1.12 and provides full
User/Roles management. It lets you specify the policies using the native Authorization mechanisms, and lets you 
granularly manage user access to the various parts of your system.

### Entities
![screen shot 2015-09-01 at 18 46 40](https://cloud.githubusercontent.com/assets/1791050/9621341/25faf32a-50da-11e5-9c4c-cb1b8ac0c0e0.png)
You define a list of entities, named after your Policy classes. This is not a requirement, but helps keep things organized.

### Roles
![screen shot 2015-09-01 at 18 47 09](https://cloud.githubusercontent.com/assets/1791050/9621338/21878380-50da-11e5-86bc-e2c0cd11635a.png)
Roles are basically your user-groups. Two roles are created out of the box (these cannot be removed):
- Superadmin: is set up with the user with the lowest ID by default. You can add more users as necessary.
- Members: all users are by default members. You cannot remove users from the Members group.

![screen shot 2015-09-01 at 18 47 42](https://cloud.githubusercontent.com/assets/1791050/9621333/1d621f5e-50da-11e5-9e1b-92e242dc180f.png)
Editing each role will let you specify granular access to each policy.

### Assignments
![screen shot 2015-09-01 at 18 48 18](https://cloud.githubusercontent.com/assets/1791050/9621369/73eed088-50da-11e5-8bd1-72c61edd3548.jpg)
Assignments tie users to roles; this is where you add and remove users to and from roles.

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
```sh
php artisan migrate --path=vendor/genealabs/laravel-governor/src/migrations
php artisan db:seed --class=LaravelGovernorDatabaseSeeder
```

Now we need to make the assets and configuration available:
```sh
php artisan vendor:publish --tag=genealabs-laravel-governor --force
```

## Configuration
Once you have published the assets, you will be able to customize the configuration of Governor for Laravel in 
`/app/config/genealabs-laravel-governor.php`. There are only two aspects to this:
- The master layout view (Blade template), by default it includes a bare-bones layout. Customizing this to your own view
  lets it adopt your site's theme (as long as it is a Bootstrap theme).
- The field you want to use as a display name field. This defaults to `name`, but you can use email, or any other field
  in the User model (you can also create your own custom attribute getter to concatenate fields, etc.).

## Implementation
The easiest way to integrate Governor for Laravel into your app is to add menu items to your app's menu. Make sure that
you restrict who has access to these. The following routes can be added:
- Entity Management: `genealabs.laravel-governor.entities`
- Role Management: `genealabs.laravel-governor.roles`
- User-Role Assignments: `genealabs.laravel-governor.assignments`

## Example Migration
The following migration should be a good starting point, of not provide all the functionality you need to add a 
`created_by` column to all your tables. Customize as necessary.
  ```php
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Database\Migrations\Migration;
  
  class AddCreatedByToAllTables extends Migration
  {
      public function up()
      {
          $user = app(config('auth.model'));
          $userIdFieldName = $user->getKeyName();
          $userTableName = $user->getTable();
          $tables = DB::table('information_schema.tables')
              ->where('table_schema', env('DB_DATABASE'))
              ->where('table_type', 'BASE TABLE')
              ->select(['table_name'])
              ->get();
  
          foreach ($tables as $tableInfo) {
              if (Schema::hasColumn($tableInfo->table_name, 'created_by')) {
                  throw new Exception('The `created_by` column already exists in one of your tables. Please fix the conflict and try again. This migration has not been run.');
              }
          }
  
          foreach ($tables as $tableInfo) {
              Schema::table($tableInfo->table_name, function(Blueprint $table) use ($userIdFieldName, $userTableName)
              {
                  $table->integer('created_by')->unsigned()->nullable();
                  $table->foreign('created_by')->references($userIdFieldName)->on($userTableName)->onDelete('cascade');
              });
          }
      }
  
      public function down()
      {
          $tables = DB::table('information_schema.tables')
              ->where('table_schema', env('DB_DATABASE'))
              ->where('table_type', 'BASE TABLE')
              ->select(['table_name'])
              ->get();
  
          foreach ($tables as $tableInfo) {
              if (Schema::hasColumn($tableInfo->table_name, 'created_by')) {
                  Schema::table($tableInfo->table_name, function(Blueprint $table) use ($tableInfo)
                  {
                      $table->dropForeign($tableInfo->table_name . '_created_by_foreign');
                      $table->dropColumn('created_by');
                  });
              }
          }
      }
  }
  ```
