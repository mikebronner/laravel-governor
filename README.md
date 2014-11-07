#Warning: still in final development stages, but functional. Do not use in production.

[![Coverage Status](https://img.shields.io/coveralls/GeneaLabs/bones-keeper.svg)](https://coveralls.io/r/GeneaLabs/bones-keeper) 
[![Build Status](https://travis-ci.org/GeneaLabs/bones-keeper.svg)](https://travis-ci.org/GeneaLabs/bones-keeper)

# Laravel Bones Keeper (bones-keeper)

## Before You Get Started

- This package depends on a BaseModel, belonging to the root namespace, so that it can be referenced by `\BaseModel`. Your BaseModel class should implement your ORM of choice (by default Eloquent); we will use this to connect to the database.
- You must have at least 1 (one) user in your users table.

## Installation

To install bones-keeper package (terminal):

```sh
composer require genealabs/bones-keeper:*
```

or manually add it to you composer.json file:

```json
    "require": {
        /* ... */,
        "genealabs/bones-keeper": "*"
    },
    /* ... */
```

And then add the service provider to your app.php config file:
```php
	// 'providers' => array(
		'GeneaLabs\Bones\Keeper\BonesKeeperServiceProvider',
    // );
```

Now we need to make the assets available (terminal):
```php
php artisan asset:publish genealabs/bones-keeper
```

## Usage

### Error Handler
You will need to add a global error handler **above** the existing default error handler to manage when a user fails the permissions-check in 
/app/start/global.php:

```php
App::error(function(NoPermissionsException $exception, $code) {
	return Response::view('genealabs/bones-keeper:unauthorized', [], 404);
});
```

The above uses the default error view that comes with the packages. You can configure this to any view you have set up 
for your app, of course keeping the message in line with the unauthorized access attempt.

## Methods

// tba

## Dependencies

At this time this package requires:

- Laravel 4.2.x
- jQuery 1.11.x
- Bootstrap 3.x
