# Change Log
[Package Checklist](http://phppackagechecklist.com/#1,2,3,4,6,7,8,9,10,11,12,13,14)

## [Unversioned]
### Added
- team migrations.

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
