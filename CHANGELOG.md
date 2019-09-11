# Change Log
[Package Checklist](http://phppackagechecklist.com/#1,2,3,4,6,7,8,9,10,11,12,13,14)

## [0.15.8] - 2019-09-11
### Added
- minor performance optimizations.

## [0.15.3] - 2019-09-08
### Fixed
- Nova resource relationship fields.

## [0.15.2] - 2019-09-07
### Fixed
- Nova navigation menu.

## [0.15.1] - 2019-09-07
### Fixed
- remnant occurrences of removed dependencies.

## [0.15.0] - 2019-09-07
### Removed
- non-Nova views. An updated version of these will be added down the line. For
  the time being, this package will work with Nova only.

## [0.14.5] - 2019-09-07
### Fixed
- rendering of groups in Nova.
- rendering of user assignments in Nova.
- errors in Nova API controllers.

## [0.14.4] - 2019-09-06
### Fixed
- unique key length when running in MySQL.

## [0.14.3] - 2019-09-06
### Fixed
- typo in data type.

## [0.14.2] - 2019-09-06
### Fixed
- database migration foreign key data type.

## [0.14.1] - 2019-09-02
### Fixed
- `keyType` property on models with string primary keys.
- typo in controller.

## [0.14.0] - 2019-08-28
### Added
- Laravel 6.0 compatibility.

## [0.13.14] - 2019-08-22
### Fixed
- guest user role assignment.

## [0.13.13] - 2019-08-20
### Added
- guest user functionality.

## [0.13.12] - 2019-08-17
### Added
- caching to improve performance and reduce number of database queries.

## [0.13.11] - 2019-08-01
### Fixed
- parsing of superadmin JSON in superadmin seeder.

## [0.13.10] - 2019-08-01
### Changed
- automatic configuration of single superadmin user to multiple superadmin users.

## [0.13.9] - 2019-08-01
### Fixed
- resource link for Teams.

## [0.13.8] - 2019-08-01
### Changed
- Nova resource class names to avoid conflicts with app's registered resources.

## [0.13.7] - 2019-07-23
### Fixed
- creation of new member.

## [0.13.6] - 2019-07-18
### Changed
- listeners to not check database for governor tables to improve performance.

## [0.13.5] - 2019-07-18
### Added
- automatic redirect to parent detail view in Nova after creating or updating a Resource.

## [0.13.4] - 2019-07-14
### Fixed
- navigation menu icon to no longer require FontAwesome to be installed.
- updating of `ownedBy` relationship to also happen on `saving` event, to catch systems that don't trigger the `creating` event, like Nova.

## [0.13.3] - 2019-06-30
### Fixed
- seeding of superadmin user password is now hashed with bcrypt.

## [0.13.2] - 2019-06-25
### Removed
- remnant log debug output.

## [0.13.1] - 2019-06-25
### Fixed
- some failing tests (which also fixed a bug).

## [0.13.0] - 2019-06-25
### Added
- details for optional creation of superuser to config file.

### Fixed
- migration order.
- automatic creation of `governor_owned_by` field.

## [0.12.0] - 2019-06-20
### Changed
- governor_role_user pivot table to use primary key instead of composite key, as Laravel does not fully support composite keys.

### Removed
- migrations that performed updates on tables, in favor of upgrade seeders.

### Added
- upgrade seeders to make the upgrade process a bit easier, as well as to keep the migration files clean for testing.

## [0.11.12] - 2019-06-15
### Fixed
- resolution of user-teams in permission checks.

## [0.11.11] - 2019-06-15
### Fixed
- resolution of entity names in permission checks.
- resolution of teams in permission checks.

## [0.11.10] - 2019-06-14
### Fixed
- when permission group headings were displayed.
- access to team permissions by SuperAdmins.

## [0.11.9] - 2019-06-13
### Fixed
- determination of effective permissions of team owner used in team permissions.
- available permission options of viewAny permissions to only no and any.

## [0.11.8] - 2019-06-12
### Changed
- Permission groups will now only show if there are more than one set up.
- Entities are now named to indicate if they are part of a package.

### Fixed
- Updated tests to complete successfully according to the updated functionality.

## [0.11.7] - 2019-06-12
### Fixed
- how index in migration is dropped.

## [0.11.6] - 2019-06-12
### Fixed
- Nova menu item Vue component registration.
- migration to drop index only if it exists.

## [0.11.5] - 2019-06-11
### Added
- team management functionality.
- team permissions functionality.

## [0.11.4] - 1 Jun 2019
### Fixed
- attaching new registrant to Member role.

## [0.11.3] - 29 May 2019
### Added
- caching of Permissions.
- caching of existence of governor_owned_by field existing in a given table.

### Fixed
- creation of governor_owned_by field in tables of governed models, if missing.

## [0.11.2] - 29 May 2019
### Added
- auth model primary key data type for creating the governor_owned_by fields.

### Fixed
- filtering of auth model records for "own" permissions.

## [0.11.1] - 28 May 2019
### Fixed
- Nova navigation menu items to only display if the user has the appropriate permissions.

## [0.11.0] - 26 May 2019
### Added
- caching to database checks to run only once every 5 minutes per table, instead
    of every query.
- upgrade instructions to README.
- query scopes for governed models.
- `ownedBy` BelongsTo relationship to governed models.

### Changed
- `governor_created_by` field to `governor_owned_by`.
- config file details in README to match current config file.
- model listeners to run more optimised and return early where possible.
- Role policy to run parent code, instead of replicating code from base policy.
- entity detection in service provider to be more robust and account for custom
    overriding of governor models.
- traits `Governable` to `Governing` and `Governed` to `Governable`.

### Removed
- autoloading of migrations, so that it won't conflict with other packages that
    might need migrations to be run a special way.

## [0.10.3] - 23 May 2019
### Added
- functionality to allow filtering of queries, via direct methods or scopes,
    based on permissions.

## [0.6.5] - 22 Jun 2018
### Added
- API endpoint to check if a user has a role to support previous version.

## [0.6.4] - 22 Jun 2018
### Added
- model method `->is($role)` to check if a user belongs to a method.

### Deprecated
- method `->isSuperAdmin` user attribute in favor of using `->is("SuperAdmin")`.

## [0.6.1] - 31 May 2018
### Fixed
- api authentication, removed `api` middleware group.

## [0.6.0] - 31 May 2018
### Added
- authorization api functionality.

### Updated
- changelog and readme.

## [0.5.10] - 22 Mar 2018
### Fixed
- various controller and view related items (work in progress).

## [0.5.9] - 22 Mar 2018
### Fixed
- policy check in Roles controller.

## [0.5.8] - 16 Mar 2018
### Fixed
- service provider class reference in console command.

## [0.5.7] - 7 Mar 2018
### Fixed
- permission seeder to respect existing records.

## [0.5.6] - 5 Mar 2018
### Fixed
- an edge-case where non-model items were being listened to in listeners.

## [0.5.5] - 10 Feb 2018
### Fixed
- service provider class name.

## [0.5.4] - 10 Feb 2018
### Added
- Laravel 5.6 compatibility.

## [0.5.3] - 3 Feb 2018
### Fixed
- entity management to automatically derive from registered policies.

## [0.5.2] - 3 Feb 2018
### Fixed
- role controller authorization.

## [0.5.1] - 20 Nov 2017
### Updated
- README with more detailed instructions on initial setup on an empty database.

### Fixed
- CreatedListener to detect edge-cases where database may not be migrated fully.

## [0.5.0] - 31 Aug 2017
### Updated
- to work with Laravel 5.5.

## [0.4.0] - 4 Jul 2017
### Added
- Laravel 5.4 compatibility.
- automatic policy detection, making Entity seeding unnecessary.
- automatic adding of `created_by` column in tables, regardless of models.
- PHPCI integration.
- initial set of tests, with more to come.
- config file documentation.

### Fixed
- role editing form.

### Changed
- views to use the projects master layout file and be easier to publish.
- config settings to be more appropriate.
- controllers and models with PHP7 stuff and general clean up.
- routes to use dedicated folder.
- traits to use dedicated folder.
- policies to be much more concise, no methods needed.
- config variables to be more consistent.
- updated README documentation.

## [0.3.0] - 24 Jan 2016
### Added
- `$incrementing = false;` to classes using `name` as primary key.
- use statements in migrations.

### Changed
- added routes to `web` route group.
- creation of `$user` using helper methods `app()` and `config()`.

## [0.2.0 - 0.2.1] - 2 Dec 2015
### Fixed
- reference to User model primary key to not use `$user->id`, but instead `$user->getKey()`.

### Changed
- installation instructions to make sure a User exists in the system.
- installation instructions for adding Entities.
- views to better resemble Spark Settings components, so they can be integrated into Spark.

### Removed
- entities view, as it wasn't conducive to a good workflow.
- requirement to manually add `Collective\Html` package.

## [0.1.8] - 29 Sep 2015
### Added
- "laravelcollective/html" as a package dependency.
- moved documentation to https://governor.forlaravel.com.

## [0.1.0] - 1 Sep 2015
### Added
- Commit initial code, derived from the Bones-Keeper package.
