# Change Log
All notable changes to this project will be documented in this file.

## //TODO
- added exceptions for invalid entity, action, or ownership
- refactor extra functionality out of user roles controller

### Package Checklist: http://phppackagechecklist.com/#1,2,4,9,10,13
- Switch back to PSR-4 and see if everything works, now that we have the service provider working properly in PSR-0.
- Add any non-essential files to .gitattributes.
- Make package framework agnostic. This may be sometime after 1.0.0 release.
- Follow PSR-1 and PSR-2 coding styles. (Configure PHPStorm for this as well.)
- Implement PHP Code Sniffer.
- Implement PHP Coding Standards Fixer.
- Write unit tests (starting with PHPUnit, then possibly phpSpec, Behat, Codeception).
- Add DocBlocks to all code.
- Follow SemVer specs: http://semver.org
- Implement TravisCI or Scrutinizer.
- Flesh out documentation and keep it updated.
- Add a CONTRIBUTING file.

## dev-master
### Added ...
- security checks to controllers and views.
- additional options to error handling.
- change log.
- auth before-filters to all controllers to prevent any unauthenticated access.

### Changed ...
- user roles to work with spaces (slugify ID on HTML elements)

### Removed

## 0.9.8
