<?php namespace GeneaLabs\LaravelGovernor\Tests\Integration\Traits;

use GeneaLabs\LaravelGovernor\GovernorOwnable;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Team;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\AuthorWithoutPolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\DB;

class GovernableTest extends UnitTestCase
{
    protected $author;
    protected $otherAuthor;
    protected $otherTeam;
    protected $otherUser;
    protected $team;
    protected $user;

    public function setUp() : void
    {
        parent::setUp();

        $this->otherUser = User::factory()->create();
        $this->actingAs($this->otherUser);
        $this->otherTeam = (new Team)->create([
            "name" => "Test Team",
            "description" => "bla bla bla",
        ]);
        $this->otherAuthor = Author::factory()->create();
        $this->otherAuthor->teams()->attach($this->team);

        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        $this->team = (new Team)->create([
            "name" => "Test Team",
            "description" => "bla bla bla",
        ]);
        $this->author = Author::factory()->create();
        $this->author->teams()->attach($this->team);
    }

    protected function tearDown(): void
    {
        // Reset any morph map a test registered so it can't leak into the rest
        // of the suite.
        Relation::morphMap([], false);
        Relation::requireMorphMap(false);

        parent::tearDown();
    }

    public function testScopeWithOwnPermissionResolvesPolymorphicOwnershipUnderMorphMap()
    {
        // The owned-records scope filters via whereHas("governorOwner"), which
        // applies getMorphClass() — the morph alias once a map is registered.
        // With ownership rows written under that same alias, the own-scope must
        // resolve ownership through the polymorphic path even with the
        // deprecated column cleared, proving the write and read alias agree.
        Relation::morphMap(['author' => Author::class]);

        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "update",
        ]);
        $permission->ownership_name = "own";
        $permission->save();

        // Records created under the map store ownable_type as the 'author' alias.
        $ownAuthor = Author::factory()->create();
        $this->actingAs($this->otherUser);
        $foreignAuthor = Author::factory()->create();
        $this->actingAs($this->user);

        // Clear the deprecated column so only the polymorphic (alias) path can
        // resolve ownership — isolates the morph-map read from the legacy-column
        // fallback so a broken morph read can't be masked.
        DB::table('authors')
            ->whereIn('id', [$ownAuthor->id, $foreignAuthor->id])
            ->update(['governor_owned_by' => null]);

        $results = (new Author)
            ->updatable()
            ->get();

        $this->assertTrue($results->contains($ownAuthor));
        $this->assertFalse($results->contains($foreignAuthor));
    }

    public function testOwnedByRelationship()
    {
        $this->assertEquals($this->user->id, $this->author->ownedBy->id);
        $this->assertEquals($this->user->id, $this->author->governor_owned_by);
    }

    public function testTeamsRelationship()
    {
        $this->assertTrue($this->user->teams->contains($this->team));
        $this->assertTrue($this->author->teams->contains($this->team));
    }

    public function testScopeDeletableWithoutPermissions()
    {
        $results = (new Author)
            ->deletable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeDeletableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "delete",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->deletable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeDeletableWithOwnPermission()
    {
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "delete",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $results = (new Author)
            ->deletable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testScopeUpdatableWithoutPermissions()
    {
        $results = (new Author)
            ->updatable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeUpdatableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "update",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->updatable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeUpdatableWithOwnPermission()
    {
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "update",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $results = (new Author)
            ->updatable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testScopeWithOwnPermissionFallsBackToLegacyColumn()
    {
        // Pre-upgrade state: governor_owned_by is set but the polymorphic
        // governor_ownables row hasn't been created yet. The owned scope must
        // still include the record via the legacy-column fallback, matching the
        // graceful degradation the rest of the package provides.
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "update",
        ]);
        $permission->ownership_name = "own";
        $permission->save();

        // Drop every Author's polymorphic ownership row to simulate pre-upgrade.
        GovernorOwnable::where('ownable_type', Author::class)->delete();

        $results = (new Author)
            ->updatable()
            ->get();

        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testScopeViewableWithoutPermissions()
    {
        $results = (new Author)
            ->viewable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeViewableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "view",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->viewable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeViewableWithOwnPermission()
    {
        (new Permission)->firstOrCreate([
            "role_name" => "Member",
            "entity_name" => "User (Laravel Governor)",
            "action_name" => "view",
            "ownership_name" => "own"
        ]);

        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "view",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $permissions = (new Permission)
            ->toBase()
            ->get();
        app()->instance("governor-permissions", $permissions);
        $authorResults = (new Author)
            ->viewable()
            ->get();
        $userClass = app(config('genealabs-laravel-governor.models.auth'));
        $userResults = (new $userClass)
            ->viewable()
            ->get();

        $this->assertTrue($authorResults->isNotEmpty());
        $this->assertTrue($authorResults->contains($this->author));
        $this->assertFalse($authorResults->contains($this->otherAuthor));
        $this->assertTrue($userResults->isNotEmpty());
        $this->assertTrue($userResults->contains($this->user));
        $this->assertFalse($userResults->contains($this->otherUser));
    }

    public function testScopeViewAnyableWithoutPermissions()
    {
        $results = (new Author)
            ->viewAnyable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeViewAnyableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "viewAny",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->viewAnyable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeViewAnyableWithOwnPermission()
    {
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "viewAny",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $results = (new Author)
            ->viewAnyable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testScopeRestorableWithoutPermissions()
    {
        $results = (new Author)
            ->restorable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeRestorableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "restore",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->restorable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeRestorableWithOwnPermission()
    {
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "restore",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $results = (new Author)
            ->restorable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testScopeForceDeletableWithoutPermissions()
    {
        $results = (new Author)
            ->forceDeletable()
            ->get();

        $this->assertEmpty($results);
    }

    public function testScopeForceDeletableWithAnyPermission()
    {
        (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "forceDelete",
            "ownership_name" => "any"
        ]);
        $results = (new Author)
            ->forceDeletable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertTrue($results->contains($this->otherAuthor));
    }

    public function testScopeForceDeletableWithOwnPermission()
    {
        $permission = (new Permission)->firstOrNew([
            "role_name" => "Member",
            "entity_name" => "Author (Laravel Governor)",
            "action_name" => "forceDelete",
        ]);
        $permission->ownership_name = "own";
        $permission->save();
        $results = (new Author)
            ->forceDeletable()
            ->get();

        $this->assertTrue($results->isNotEmpty());
        $this->assertTrue($results->contains($this->author));
        $this->assertFalse($results->contains($this->otherAuthor));
    }

    public function testAuthorWithoutPolicyFailsPermissions()
    {
        $results = (new AuthorWithoutPolicy)
            ->viewable()
            ->get();

        $this->assertTrue($results->isEmpty());
    }
}
