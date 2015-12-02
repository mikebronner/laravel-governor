# Change Log
[Package Checklist](http://phppackagechecklist.com/#1,2,3,4,6,7,8,9,10,11,12,13,14)

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
