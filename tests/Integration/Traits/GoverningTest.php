<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration\Traits;

use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Team;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Relations\Relation;

class GoverningTest extends UnitTestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    protected function tearDown(): void
    {
        // Reset any morph map a test registered so it can't leak into the rest
        // of the suite.
        Relation::morphMap([], false);
        Relation::requireMorphMap(false);

        parent::tearDown();
    }

    // --- Restored regression coverage for unchanged Governing behavior ---
    // These guard hasRole(), roles(), getPermissionsAttribute() and the
    // deprecated ownedTeams() relationship, none of which this refactor touches.

    public function testHasRole(): void
    {
        $this->assertTrue($this->user->hasRole("Member"));
    }

    public function testHasRoleWithNonExistingRole(): void
    {
        $this->assertFalse($this->user->hasRole("Janitor"));
    }

    public function testHasRoleWithoutRoles(): void
    {
        (new Role)
            ->whereIn("name", ["Member"])
            ->delete();

        $this->assertFalse($this->user->hasRole("Member"));
    }

    public function testHasRoleWhereUserHasNoRole(): void
    {
        $this->user->roles()->sync([]);

        $this->assertFalse($this->user->hasRole("Member"));
    }

    public function testRolesRelationship(): void
    {
        $role = (new Role)
            ->where("name", "Member")
            ->first();

        $this->assertTrue($this->user->roles->contains($role));
    }

    public function testOwnedTeamsRelationship(): void
    {
        $team = (new Team)->create([
            "name" => "Test Team",
            "description" => "bla bla bla",
        ]);

        $teams = (new Team)->get();

        $this->assertTrue($teams->contains($team));
        $this->assertTrue($this->user->ownedTeams->contains($team));
    }

    public function testPermissionsAttribute(): void
    {
        $permission = (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "author",
            "action_name" => "delete",
            "ownership_name" => "any",
        ]);
        $permissions = (new Permission)
            ->toBase()
            ->get();
        app()->instance("governor-permissions", $permissions);

        $this->assertTrue($this->user->permissions->keyBy("id")->has($permission->id));
    }

    // --- Polymorphic ownership coverage ---

    public function testGovernorOwnedTeamsReturnsTeamsOwnedViaPolymorphic(): void
    {
        $team1 = (new Team)->create([
            'name' => 'Team Alpha',
            'description' => 'First team',
        ]);
        $team2 = (new Team)->create([
            'name' => 'Team Beta',
            'description' => 'Second team',
        ]);

        $ownedTeams = $this->user->governorOwnedTeams();

        $this->assertCount(2, $ownedTeams);
        $this->assertTrue($ownedTeams->contains('id', $team1->id));
        $this->assertTrue($ownedTeams->contains('id', $team2->id));
    }

    public function testGovernorOwnedTeamsExcludesOtherUsersTeams(): void
    {
        $otherUser = User::factory()->create();

        $myTeam = (new Team)->create([
            'name' => 'My Team',
            'description' => 'Mine',
        ]);

        $this->actingAs($otherUser);
        $otherTeam = (new Team)->create([
            'name' => 'Other Team',
            'description' => 'Not mine',
        ]);

        $this->actingAs($this->user);
        $ownedTeams = $this->user->governorOwnedTeams();

        $this->assertCount(1, $ownedTeams);
        $this->assertTrue($ownedTeams->contains('id', $myTeam->id));
        $this->assertFalse($ownedTeams->contains('id', $otherTeam->id));
    }

    public function testGovernorOwnedTeamsReturnsEmptyCollectionWhenNoTeams(): void
    {
        $ownedTeams = $this->user->governorOwnedTeams();

        $this->assertCount(0, $ownedTeams);
    }

    public function testGovernorOwnedTeamsResolvesUnderMorphMap(): void
    {
        // With a morph map registered, the team's getMorphClass() returns the
        // alias. governorOwnedTeams() must filter on that same alias the
        // CreatedListener wrote, or it silently returns no teams.
        Relation::morphMap(['team' => Team::class]);

        $team = (new Team)->create([
            'name' => 'Aliased Team',
            'description' => 'Owned under a morph map',
        ]);

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => 'team',
            'ownable_id' => $team->getKey(),
            'user_id' => $this->user->id,
        ]);

        $ownedTeams = $this->user->governorOwnedTeams();

        $this->assertCount(1, $ownedTeams);
        $this->assertTrue($ownedTeams->contains('id', $team->id));
    }

    public function testDeprecatedOwnedTeamsRelationResolvesViaLegacyColumn(): void
    {
        $team = (new Team)->create([
            'name' => 'Legacy Team',
            'description' => 'Owned via the deprecated governor_owned_by column',
        ]);

        // The deprecated ownedTeams() HasMany still resolves against the
        // backward-compatible governor_owned_by column maintained by CreatingListener.
        $ownedTeams = $this->user->ownedTeams;

        $this->assertTrue($ownedTeams->contains('id', $team->id));
    }
}
