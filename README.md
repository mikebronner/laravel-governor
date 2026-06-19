# Governor For Laravel
[![Tests](https://github.com/mikebronner/laravel-governor/actions/workflows/tests.yml/badge.svg)](https://github.com/mikebronner/laravel-governor/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/mikebronner/laravel-governor/branch/master/graph/badge.svg)](https://codecov.io/gh/mikebronner/laravel-governor)
[![Latest StableVersion](https://poser.pugx.org/genealabs/laravel-governor/v/stable.png)](https://packagist.org/packages/genealabs/laravel-governor)
[![Total Downloads](https://poser.pugx.org/genealabs/laravel-governor/downloads.png)](https://packagist.org/packages/genealabs/laravel-governor)

![Governor for Laravel](https://repository-images.githubusercontent.com/41706753/37d93d00-f1b1-11e9-9f67-067c80849466)

**Manage authorization with granular role-based permissions in your Laravel apps.**

![screencast 2017-06-04 at 3 34 56 pm](https://cloud.githubusercontent.com/assets/1791050/26765962/fa085878-493b-11e7-9bb7-b4d9f88844a0.gif)

## Goal
Provide a simple method of managing ACL in a Laravel application built on the
 Laravel Authorization functionality. By leveraging Laravel's native
 Authorization functionality there is no additional learning or implementation
 curve. All you need to know is Laravel, and you will know how to use Governor
 for Laravel.

## Requirements

| Laravel | PHP            | Package |
|---------|----------------|---------|
| 10.x    | 8.2+           | latest  |
| 11.x    | 8.2+           | latest  |
| 12.x    | 8.2+           | latest  |
| 13.x    | 8.3+           | latest  |

### Additional Requirements
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

## Implementation
1. First we need to update the database by running the migrations and data seeders:
    ```sh
    php artisan migrate --path="vendor/genealabs/laravel-governor/database/migrations"
    php artisan db:seed --class=LaravelGovernorDatabaseSeeder
    ```

2. If you have seeders of your own, run them now:
    ```sh
    php artisan db:seed
    ```

3. Next, assign permissions (this requires you have users already populated):
    ```sh
    php artisan db:seed --class=LaravelGovernorPermissionsTableSeeder
    ```

4. Now we need to make the assets available:
    ```sh
    php artisan governor:publish --assets
    ```

5. Lastly, add the `Governing` trait to the User model of your app. This is the
    trait for your authenticatable/user model — it provides role checks
    (`hasRole()`), the `roles`, `teams`, and `ownedTeams` relationships, and the
    `permissions` / `effective_permissions` attributes. (`Governing` also pulls in
    the `Governable` trait, so user models receive its query scopes and ownership
    relationship as well.)
    ```php
    // [...]
    use GeneaLabs\LaravelGovernor\Traits\Governing;

    class User extends Authenticatable
    {
        use Governing;
        // [...]
    }
    ```

    > **Note:** Add the `Governable` trait (not `Governing`) to any *other* model
    > you want Governor to protect with policies and ownership tracking. See the
    > [API Reference](#api-reference) for the full trait surface.

## Upgrading
The following upgrade guides should help navigate updates with breaking changes.

### From 0.11.5+ to 0.12 [Breaking]
The role_user pivot table has replaced the composite key with a primary key, as Laravel does not fully support composite keys. Run:
```sh
php artisan db:seed --class="LaravelGovernorUpgradeTo0120"
```

### From 0.11 to 0.11.5 [Breaking]
The primary keys of the package's tables have been renamed. (This should have been a minor version change, instead of a patch, as this was a breaking change.) Run:
```sh
php artisan db:seed --class="LaravelGovernorUpgradeTo0115"
```

### From 0.10 to 0.11 [Breaking]
The following traits have changed:
- `Governable` has been renamed to `Governing`.
- `Governed` has been renamed to `Governable`.
- the `governor_created_by` has been renamed to `governor_owned_by`. Run migrations to update your tables.
    ```sh
    php artisan db:seed --class="LaravelGovernorUpgradeTo0110"
    ```
- replace any reference in your app from `governor_created_by` to
    `governor_owned_by`.

### From 0.6 to Version 0.10 [Breaking]
To upgrade from version previous to `0.10.0`, first run the migrations and
seeders, then run the update seeder:
```sh
php artisan migrate --path="vendor/genealabs/laravel-governor/database/migrations"
php artisan db:seed --class="LaravelGovernorDatabaseSeeder"
php artisan db:seed --class="LaravelGovernorUpgradeTo0100"
```

### to 0.6 [Breaking]
1. If you were extending `GeneaLabs\LaravelGovernor\Policies\LaravelGovernorPolicy`,
  change to extend `GeneaLabs\LaravelGovernor\Policies\BasePolicy`;
2. Support for version of Laravel lower than 5.5 has been dropped.

## Configuration
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

**Your policies must extend `GeneaLabs\LaravelGovernor\Policies\BasePolicy` in
 order to function with Governor.** By default you do not need to include any of
 the methods, as they are implemented automatically and perform checks based on
 reflection. However, if you need to customize anything, you are free to override
 any of the `create`, `update`, `viewAny`, `view`, `delete`, `restore`, and
 `forceDelete` methods.

#### Checking Authorization
To validate a user against a given policy, use one of the keywords that Governor
 validates against: `create`, `view`, `viewAny`, `update`, `delete`, `restore`,
 and `forceDelete`. For example, if the desired policy to check has a
 class name of `BlogPostPolicy`, you would authorize your user with something
 like `$user->can('create', BlogPost::class)` or `$user->can('update', $blogPost)`.
 Custom policy actions are supported too — they are registered automatically (see
 the [API Reference](#api-reference)).

### Filter Queries To Show Only Allowed Items
Often it is desirable to let the user see only the items that they have access
    to. The `Governable` trait adds Eloquent query scopes to your governed models
    that constrain a query to the records the authenticated user is permitted to
    act on. Using Nova as an example, you can limit the index view as follows:
    ```php
    <?php namespace App\Nova;

    use Laravel\Nova\Resource as NovaResource;
    use Laravel\Nova\Http\Requests\NovaRequest;

    abstract class Resource extends NovaResource
    {
        public static function indexQuery(NovaRequest $request, $query)
        {
            $model = $query->getModel();

            if ($model
                && is_object($model)
                && method_exists($model, "scopeViewAnyable")
            ) {
                return $query->viewAnyable();
            }

            return $query;
        }

        // ...
    }
    ```

    The available query scopes are:
    - `deletable()` — records the user may `delete`
    - `forceDeletable()` — records the user may `forceDelete`
    - `restorable()` — records the user may `restore`
    - `updatable()` — records the user may `update`
    - `viewable()` — records the user may `view`
    - `viewAnyable()` — records the user may `viewAny`

    See the [API Reference](#api-reference) for full details on these scopes.

### Caching
Governor can cache lookup table queries (roles, actions, entities, permissions)
across requests to reduce database load. This is disabled by default.

To enable caching, publish the config file and update the `cache` section:
```php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // seconds, or null for "forever"
],
```

Cache is automatically invalidated when any lookup table model is modified.
Invalidation is coarse-grained: a change to any single lookup table (e.g. a
role) flushes the cache for all lookup tables. This keeps the invalidation
logic simple and reliable, which is appropriate given that lookup tables change
infrequently.

### Tables
Tables will automatically be updated with a `governor_owned_by` column that references
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

### Authorization API
Governor exposes a small read-only HTTP API for checking the authenticated
user's authorization from a decoupled client (SPA, mobile app, etc.). The routes
are registered under the hard-coded `api/` prefix combined with your configured
`url-prefix` (which defaults to `/genealabs/laravel-governor/`), so the resulting
base path is `api/genealabs/laravel-governor/`. They are protected by the
`auth:api` middleware, so the caller must be authenticated against your API
guard. Laravel Passport (or Sanctum) is a convenient way to maintain that
session state between your client and your backend.

Both endpoints answer with an **empty body** and communicate the result purely
through the HTTP status code:

| Status | Meaning |
|--------|---------|
| `204 No Content` | The user **is** authorized — the check passed. |
| `403 Forbidden` | The user is **not** authorized — the check failed. |

Authorization is evaluated *before* request validation, so a request that cannot
be authorized — including one that omits the required `model` parameter, leaving
nothing to authorize against — also resolves to `403 Forbidden` rather than a
validation error.

#### Ability Check — `user-can`
- **Endpoint:** `GET api/genealabs/laravel-governor/user-can/{ability}`
- **Route name:** `genealabs.laravel-governor.api.user-can.show`

Checks whether the authenticated user may perform `{ability}` (`create`, `view`,
`viewAny`, `update`, `delete`, `restore`, `forceDelete`, or any custom policy
action) against the given model.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `ability` | URL | yes | The policy ability/action to check. |
| `model` | query/body | yes | Fully-qualified class name of the model the ability applies to. |
| `primary-key` | query/body | record-level abilities only | Primary key of a specific record. Required when the ability targets an existing record (e.g. `update`, `view`, `delete`); omit it for class-level abilities such as `create` and `viewAny`. |

Class-level check (may the user create any `Role`?):
```php
$response = $this->json(
    "GET",
    route('genealabs.laravel-governor.api.user-can.show', "create"),
    [
        "model" => "GeneaLabs\\LaravelGovernor\\Role",
    ]
);

$response->assertNoContent(); // 204 when authorized, 403 when not
```

Record-level check (may the user update `Role` #1?):
```php
$response = $this->json(
    "GET",
    route('genealabs.laravel-governor.api.user-can.show', "update"),
    [
        "model" => "GeneaLabs\\LaravelGovernor\\Role",
        "primary-key" => 1,
    ]
);
```

#### Role Check — `user-is`
- **Endpoint:** `GET api/genealabs/laravel-governor/user-is/{role}`
- **Route name:** `genealabs.laravel-governor.api.user-is.show`

Checks whether the authenticated user is assigned the given role. Users with the
`SuperAdmin` role always pass. Returns `204 No Content` when the user has the
role and `403 Forbidden` when they do not.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `role` | URL | yes | Name of the role to check for. |

```php
$response = $this->json(
    "GET",
    route('genealabs.laravel-governor.api.user-is.show', "SuperAdmin")
);

$response->assertNoContent(); // 204 when the user has the role, 403 when not
```

## API Reference
This section documents Governor's public API: the traits you add to your models
(and their methods, relationships, and query scopes), the Artisan commands, the
model lifecycle events Governor reacts to, and the configuration options.

### Traits

#### `Governing`
Add to your **authenticatable / user model**. It composes the `Governable` trait,
so a user model also receives everything `Governable` provides (see below).

| Member | Signature | Returns | Purpose |
|--------|-----------|---------|---------|
| `hasRole()` | `hasRole(string $name): bool` | `bool` | Whether the user is assigned the named role. Users with the `SuperAdmin` role always return `true`. |
| `roles()` | `roles(): BelongsToMany` | relationship | The roles assigned to the user (via the `governor_role_user` pivot). |
| `teams()` | `teams(): BelongsToMany` | relationship | The teams the user belongs to (via the `governor_team_user` pivot). |
| `ownedTeams()` | `ownedTeams(): HasMany` | relationship | The teams the user owns (created). |
| `permissions` | accessor attribute | `Collection` | Every permission granted to the user through their roles. |
| `effective_permissions` | accessor attribute | `Collection` | The user's permissions de-duplicated per entity + action, collapsed to the broadest ownership (`any` is preferred over `own`). |

```php
use GeneaLabs\LaravelGovernor\Traits\Governing;

class User extends Authenticatable
{
    use Governing;
}

$user->hasRole("SuperAdmin");   // bool
$user->roles;                    // Collection<Role>
$user->teams;                    // Collection<Team>
$user->ownedTeams;               // Collection<Team>
$user->permissions;              // Collection<Permission>
$user->effective_permissions;    // Collection<Permission>
```

#### `Governable`
Add to any **model you want Governor to protect** (governed entities). It adds
ownership tracking, the team relationship, and authorization-aware query scopes.
Governor automatically adds a `governor_owned_by` column to governed tables and
populates it with the creating user's key.

**Relationships**

| Member | Signature | Returns | Purpose |
|--------|-----------|---------|---------|
| `ownedBy()` | `ownedBy(): BelongsTo` | relationship | The user that owns (created) the record, resolved via `governor_owned_by`. |
| `teams()` | `teams(): MorphToMany` | relationship | The teams the record is shared with (via the `governor_teamables` pivot). |

**Query scopes** — each narrows a query to the records the authenticated user
may perform the action on. A `SuperAdmin` (or a permission with `any` ownership)
sees all records; an `own` permission limits results to records the user owns or
shares via a team; an unauthorized user gets no records.

| Scope | Signature | Action checked |
|-------|-----------|----------------|
| `viewable()` | `viewable(Builder $query): Builder` | `view` |
| `viewAnyable()` | `viewAnyable(Builder $query): Builder` | `viewAny` |
| `updatable()` | `updatable(Builder $query): Builder` | `update` |
| `deletable()` | `deletable(Builder $query): Builder` | `delete` |
| `restorable()` | `restorable(Builder $query): Builder` | `restore` |
| `forceDeletable()` | `forceDeletable(Builder $query): Builder` | `forceDelete` |

```php
use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use Governable;
}

// Only the articles the current user may view:
$articles = Article::viewable()->get();

// Scopes compose with other query constraints:
$articles = Article::updatable()->where("published", true)->get();

$article->ownedBy;   // the owning User (BelongsTo)
$article->teams;     // Collection<Team> the article is shared with
```

### Policies (`BasePolicy`)
Every governed model resolves to a policy that extends
`GeneaLabs\LaravelGovernor\Policies\BasePolicy`. The base class implements the
seven standard Laravel policy actions for you — each delegates to Governor's
permission engine, so you only override a method when you need custom behavior.
You rarely call these directly; Laravel's `Gate` / `$user->can()` invokes them
(see [Checking Authorization In Code](#checking-authorization-in-code)).

| Method | Signature | Returns | Purpose |
|--------|-----------|---------|---------|
| `create()` | `create(?Model $user): bool` | `bool` | Whether the user may create a new record of the entity. |
| `viewAny()` | `viewAny(?Model $user): bool` | `bool` | Whether the user may view the entity's listing/index. |
| `view()` | `view(?Model $user, Model $model): bool` | `bool` | Whether the user may view the given record. |
| `update()` | `update(?Model $user, Model $model): bool` | `bool` | Whether the user may update the given record. |
| `delete()` | `delete(?Model $user, Model $model): bool` | `bool` | Whether the user may delete the given record. |
| `restore()` | `restore(?Model $user, Model $model): bool` | `bool` | Whether the user may restore the given soft-deleted record. |
| `forceDelete()` | `forceDelete(?Model $user, Model $model): bool` | `bool` | Whether the user may permanently delete the given record. |

A `SuperAdmin` short-circuits every action to `true`; otherwise the result is
driven by the role/team permissions seeded for the entity. See the
[Default Methods In A Policy Class](#default-methods-in-a-policy-class) example
below for the exact bodies, and add any extra public method to your policy to
register a [custom action](#checking-authorization-in-code).

**Entity-resolution helpers** (provided by the `EntityManagement` trait, which
both `BasePolicy` and `Governable` compose) are public and occasionally useful
when integrating with the package:

| Method | Signature | Returns | Purpose |
|--------|-----------|---------|---------|
| `getEntityFromModel()` | `getEntityFromModel(string $modelClass): string` | `string` | The Governor entity name a model class resolves to (via its policy), or `""` when the model has no policy. |
| `parsePolicies()` | `parsePolicies(): void` | `void` | Discovers and registers all policies as Governor entities. Runs automatically through the package middleware; call it manually only when you need to force discovery. |

### Checking Authorization In Code
Because Governor builds on Laravel's native authorization, check abilities with
the standard `Gate` / `$user->can()` API — Governor resolves the policy and
validates the user's permissions automatically:

```php
$user->can("create", Article::class);   // class-level ability
$user->can("update", $article);          // record-level ability
```

The default policy actions Governor validates against are `create`, `view`,
`viewAny`, `update`, `delete`, `restore`, and `forceDelete`. Any
additional public method you add to a policy is treated as a **custom action**
and is registered automatically (under the name `{ModelClass}:{method}`) the
first time a request passes through the package's middleware.

### Artisan Commands

#### `governor:setup`
Assigns the `SuperAdmin` role (and `Member`, when that role exists) to a user.
Provide exactly one of the two options to identify the user. The Governor seeders
must have been run first so that the `SuperAdmin` role exists.

```sh
php artisan governor:setup --superadmin=jane@example.com
php artisan governor:setup --user=1
```

| Option | Description |
|--------|-------------|
| `--superadmin=<email>` | Email address of the user to promote to SuperAdmin. |
| `--user=<id>` | Primary key of the user to promote to SuperAdmin. |

#### `governor:publish`
Publishes the package's publishable resources. Pass one or more flags:

```sh
php artisan governor:publish --config --views --assets --migrations
```

| Flag | Publishes |
|------|-----------|
| `--config` | The configuration file to `config/genealabs-laravel-governor.php`. |
| `--views` | The Blade views, for customization. |
| `--assets` | The CSS/JS assets to your `public/` directory. |
| `--migrations` | The package migrations to your app's `database/migrations` directory. |

### Events
Governor listens to Eloquent model lifecycle events globally and reacts as
follows. You do not need to wire anything up — these run automatically once the
service provider is registered:

| Event | Applies to | Behavior |
|-------|-----------|----------|
| `eloquent.creating` / `eloquent.saving` | Any model using `Governable` | Resolves the model's policy entity and sets `governor_owned_by` to the authenticated user's key when it is not already set. |
| `eloquent.created` | Your auth/user model | Assigns the new user the `Member` role, creating that role if it does not yet exist. |
| `eloquent.creating` | Team-invitation model | Generates a UUID token for the invitation and associates it with the authenticated user. |
| `eloquent.created` | Team-invitation model | Sends the `TeamInvitation` notification to the invitee's email address. |
| `eloquent.created` | Team model | Adds the creating user as a team member and seeds the team's permissions from the owner's role permissions. |

### Configuration Options
The following keys are available in `config/genealabs-laravel-governor.php`
(publish it with `php artisan governor:publish --config`):

| Key | Default | Purpose |
|-----|---------|---------|
| `layout-view` | `'layouts.app'` | Blade layout that wraps Governor's admin views. Must include Bootstrap 3 and FontAwesome 4. |
| `content-section` | `'content'` | Name of the layout section Governor renders its content into. |
| `auth-model-primary-key-type` | `'bigInteger'` | Column type for the `governor_owned_by` foreign key (`bigInteger` or `integer`), to match your user table's primary key. |
| `models` | Governor's model classes | Map of the model classes Governor uses (`auth`, `action`, `assignment`, `entity`, `group`, `ownership`, `permission`, `role`, `team`, `invitation`). `auth` defaults to your app's configured user model; override any entry to swap in your own model. |
| `user-name-property` | `'name'` | The auth-model property displayed when assigning users to roles. |
| `url-prefix` | `'/genealabs/laravel-governor/'` | URL prefix for the admin pages, and the base used for the API routes. |
| `superadmins` | `env("GOVERNOR_SUPERADMINS")` | Optional JSON array of SuperAdmin users to create if missing. |
| `admins` | `env("GOVERNOR_ADMINS")` | Optional JSON array of Admin users to create if missing. |
| `entity-aliases` | `[]` | Map of raw entity name → display name shown in the UI. |
| `cache.enabled` | `false` | Enable cross-request caching of lookup tables (roles, actions, entities, permissions). |
| `cache.ttl` | `3600` | Cache lifetime in seconds; use `null` to cache forever (until invalidated). |

## Examples
### Config File
For a per-key description of every option, see the
[Configuration Options](#configuration-options) table in the API Reference. The
published config file looks like this:
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
    'auth-model-primary-key-type' => 'bigInteger',
    "models" => [
        "auth" => config('auth.providers.users.model')
            ?? config('auth.model'),
        "action" => GeneaLabs\LaravelGovernor\Action::class,
        "assignment" => GeneaLabs\LaravelGovernor\Assignment::class,
        "entity" => GeneaLabs\LaravelGovernor\Entity::class,
        "group" => GeneaLabs\LaravelGovernor\Group::class,
        "ownership" => GeneaLabs\LaravelGovernor\Ownership::class,
        "permission" => GeneaLabs\LaravelGovernor\Permission::class,
        "role" => GeneaLabs\LaravelGovernor\Role::class,
        "team" => GeneaLabs\LaravelGovernor\Team::class,
        "invitation" => GeneaLabs\LaravelGovernor\TeamInvitation::class,
    ],

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

    /*
    |--------------------------------------------------------------------------
    | Default SuperAdmin User
    |--------------------------------------------------------------------------
    |
    | You may optionally specify a set of SuperAdmin and Admin users that will
    | be created if they don't already exist, formatted as JSON.
    | Example: [{"name":"Joe Doe","email":"joe@example.com","password":"secret1"}]
    */
    "superadmins" => env("GOVERNOR_SUPERADMINS"),
    "admins" => env("GOVERNOR_ADMINS"),

    /*
    |--------------------------------------------------------------------------
    | Entity Aliases
    |--------------------------------------------------------------------------
    |
    | Define display aliases for entity names. Keys are the raw entity
    | names (as stored in the database), and values are the display
    | names shown in the UI. Any entity not listed here will display
    | its original name.
    */
    'entity-aliases' => [],

    /*
    |--------------------------------------------------------------------------
    | Lookup Table Cache
    |--------------------------------------------------------------------------
    |
    | Governor can cache lookup table queries (roles, actions, entities,
    | permissions) across requests to reduce database load.
    | Set 'enabled' to true to activate cross-request caching, and 'ttl' to
    | the number of seconds cached data should persist (null for "forever").
    */
    'cache' => [
        'enabled' => false,
        'ttl' => 3600,
    ],
];
```

### Policy
#### No Methods Required For Default Policies
Adding policies is crazily simple! All the work has been refactored out so all
 you need to worry about now is creating a policy class, and that's it!

```php
<?php namespace App\Policies;

use GeneaLabs\LaravelGovernor\Policies\BasePolicy;

class ArticlePolicy extends BasePolicy
{
}
```

#### Default Methods In A Policy Class
Adding any of the `create`, `update`, `viewAny`, `view`, `delete`, `restore`,
and `forceDelete` methods to your policy is only required if you want to
customize a given method. The implementations below mirror `BasePolicy` — each
delegates to `validatePermissions()`, which short-circuits to `true` for a
`SuperAdmin` and otherwise checks the user's role/team permissions for the
action. Record-level methods pass the `$model` itself; `validatePermissions()`
reads the record's owner from it internally.

```php
abstract class BasePolicy
{
    public function create(?Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'create',
            $this->entity
        );
    }

    public function update(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'update',
            $this->entity,
            $model
        );
    }

    public function viewAny(?Model $user) : bool
    {
        return $this->validatePermissions(
            $user,
            'viewAny',
            $this->entity
        );
    }

    public function view(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'view',
            $this->entity,
            $model
        );
    }

    public function delete(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'delete',
            $this->entity,
            $model
        );
    }

    public function restore(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'restore',
            $this->entity,
            $model
        );
    }

    public function forceDelete(?Model $user, Model $model) : bool
    {
        return $this->validatePermissions(
            $user,
            'forceDelete',
            $this->entity,
            $model
        );
    }
}
```
