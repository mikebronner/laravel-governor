<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration;

use GeneaLabs\LaravelGovernor\Http\Controllers\Api\UserCan as UserCanController;
use GeneaLabs\LaravelGovernor\Http\Controllers\Api\UserIs as UserIsController;
use GeneaLabs\LaravelGovernor\Http\Requests\UserCan as UserCanRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UserIs as UserIsRequest;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;

/**
 * Verifies that the public API documented in the README actually exists and
 * behaves as documented. Guards against the documentation drifting away from
 * the code — e.g. referencing a non-existent attribute, the wrong trait, or
 * the wrong HTTP response shape.
 */
class PublicApiDocumentationTest extends UnitTestCase
{
    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function testGoverningTraitExposesDocumentedMembers()
    {
        $this->assertTrue($this->user->hasRole("Member"));
        $this->assertInstanceOf(BelongsToMany::class, $this->user->roles());
        $this->assertInstanceOf(BelongsToMany::class, $this->user->teams());
        $this->assertInstanceOf(HasMany::class, $this->user->ownedTeams());
    }

    public function testGoverningTraitExposesDocumentedPermissionAttributes()
    {
        // Documented as $user->permissions and $user->effective_permissions.
        $this->assertInstanceOf(Collection::class, $this->user->permissions);
        $this->assertInstanceOf(Collection::class, $this->user->effective_permissions);
    }

    public function testGovernableTraitExposesDocumentedScopes()
    {
        $scopes = [
            "scopeViewable",
            "scopeViewAnyable",
            "scopeUpdatable",
            "scopeDeletable",
            "scopeRestorable",
            "scopeForceDeletable",
        ];

        foreach ($scopes as $scope) {
            $this->assertTrue(
                method_exists(Author::class, $scope),
                "Documented query scope {$scope} is missing from the Governable trait."
            );
        }

        $this->assertInstanceOf(Builder::class, Author::viewable());
    }

    public function testGovernableTraitExposesDocumentedRelationships()
    {
        $author = new Author();

        $this->assertInstanceOf(BelongsTo::class, $author->ownedBy());
        $this->assertInstanceOf(MorphToMany::class, $author->teams());
    }

    public function testUserCanApiReturnsDocumentedNoContentResponse()
    {
        $response = (new UserCanController())->show(new UserCanRequest(), "create");

        // Documented contract: 204 No Content with an empty body.
        $this->assertSame(204, $response->getStatusCode());
        $this->assertEmpty($response->getContent());
    }

    public function testUserIsApiReturnsDocumentedNoContentResponse()
    {
        $response = (new UserIsController())->show(new UserIsRequest(), "SuperAdmin");

        // Documented contract: 204 No Content with an empty body.
        $this->assertSame(204, $response->getStatusCode());
        $this->assertEmpty($response->getContent());
    }
}
