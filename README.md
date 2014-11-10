#Warning: still in final development stages, but functional. Do not use in production.

[![Coverage Status](https://img.shields.io/coveralls/GeneaLabs/bones-keeper.svg)](https://coveralls.io/r/GeneaLabs/bones-keeper) 
[![Build Status](https://travis-ci.org/GeneaLabs/bones-keeper.svg)](https://travis-ci.org/GeneaLabs/bones-keeper)

# Laravel Bones | Keeper

**keep·er**
/ˈkēpər/

noun: keeper; plural noun: keepers

- a person who manages or looks after something or someone.
- an object that keeps another in place, or protects something more fragile or valuable, in particular.

## Before You Get Started

- This package depends on a BaseModel, belonging to the root namespace, so that it can be referenced by `\BaseModel`. Your BaseModel class should implement your ORM of choice (by default Eloquent); we will use this to connect to the database.
- You must have at least 1 (one) user in your users table.

## Installation

To install bones-keeper package (terminal):

```sh
composer require genealabs/bones-keeper:dev-master
```

or manually add it to you composer.json file:

```json
    "require": {
        /* ... */,
        "genealabs/bones-keeper": "dev-master"
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

### Error Handlers
You will need to add two global error handlers **above** the existing default error handler to manage when a user fails the permissions-check in 
/app/start/global.php:

```php
App::error(function(GeneaLabs\Bones\Keeper\Exceptions\InvalidAccessException $exception, $code) {
    return Response::make(View::make('bones-keeper::errors.unauthorized'), 404);
});
App::error(function (Watson\Validating\ValidationException\ValidationException $exception) {
    return Redirect::route('modelValidation')->withErrors($exception->getErrors());
});
```

The above uses the default error views that come with the package. You can customize these using your own views, of course.

## Methods

// tba

## Dependencies

At this time this package requires:

- Laravel 4.2.x
- jQuery 1.11.x
- Bootstrap 3.x
