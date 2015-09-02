![governor for laravel](https://cloud.githubusercontent.com/assets/1791050/9620997/05b36650-50d6-11e5-864b-f15bd9622d08.jpg)

# Governor for Laravel
[![Build Status](https://travis-ci.org/GeneaLabs/laravel-governor.svg?branch=master)](https://travis-ci.org/GeneaLabs/laravel-governor)

## Features
Governor for Laravel takes full advantage of the Authorization functionality added to Laravel 5.1.12 and provides full
User/Roles management. It lets you specify the policies using the native Authorization mechanisms, and lets you granularly
manage user access to the various parts of your system.

### Entities
You define a list of entities, named after your Policy classes. This is not a requirement, but helps keep things organized.

### Roles
Roles are basically your user-groups. Two roles are created out of the box (these cannot be removed):
- Superadmin: is set up with the user with the lowest ID by default. You can add more users as necessary.
- Members: all users are by default members. You cannot remove users from the Members group.
Editing each role will let you specify granular access to each policy.

### Assignments
Assignments tie users to roles; this is where you add and remove users to and from roles.

## Before You Get Started
- You must have at least 1 (one) user in your users table. The user with the lowest ID will become your admin by default. This can be changed after the installation, of course.
- You must add a `created_by` column to each of your tables. I purposefully chose not to write a 'magical' migration that 
  would do all this for you, as that could lead to problems. However, the following is what such a migration might look like
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
```sh
php artisan migrate --path=vendor/genealabs/laravel-governor/src/migrations
php artisan db:seed --class=LaravelGovernorDatabaseSeeder
```

Now we need to make the assets and configuration available:
```sh
php artisan vendor:publish --tag=genealabs-laravel-governor --force
```

## Configuration
Once you have published the assets, you will be able to customize the configuration of Governor for Laravel. There are
only two aspects to this:
- The master layout view (Blade template), by default it includes a bare-bones layout. Customizing this to your own view
  lets it adopt your site's theme (as long as it is a Bootstrap theme).
- The field you want to use as a display name field. This defaults to `name`, but you can use email, or any other field
  in the User model (you can also create your own custom attribute getter to concatinate fields, etc.).

## Implementation
The easiest way to integrate Governor for Laravel into your app is to add menu items to your app's menu. Make sure that
you restrict who has access to these. The following routes can be added:
- Entity Management: `genealabs.laravel-governor.entities`
- Role Management: `genealabs.laravel-governor.roles`
- User-Role Assignments: `genealabs.laravel-governor.assignments`

