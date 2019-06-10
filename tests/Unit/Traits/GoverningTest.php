<?php namespace GeneaLabs\LaravelGovernor\Tests\Unit\Traits;

use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Team;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use GeneaLabs\LaravelGovernor\Role;

class GoverningTest extends UnitTestCase
{
    protected $author;
    protected $team;
    protected $user;

    public function setUp() : void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->actingAs($this->user);
        $this->team = (new Team)->create([
            "name" => "Test Team",
            "description" => "bla bla bla",
        ]);
        $this->author = factory(Author::class)->create();
        $this->author->teams()->attach($this->team);
    }

    public function testHasRole()
    {
        $this->assertTrue($this->user->hasRole("Member"));
    }

    public function testRolesRelationship()
    {
        $role = (new Role)
            ->where("name", "Member")
            ->first();

        $this->assertTrue($this->user->roles->contains($role));
    }

    public function testOwnedTeamsRelationship()
    {
        $teams = (new Team)
            ->get();

        $this->assertTrue($teams->contains($this->team));
        $this->assertTrue($this->user->ownedTeams->contains($this->team));
    }

    public function testPermissionsAttribute()
    {
        $permission = (new Permission)->create([
            "role_name" => "Member",
            "entity_name" => "author",
            "action_name" => "delete",
            "ownership_name" => "any"
        ]);

        $this->assertTrue($this->user->permissions->contains($permission));
    }

    public function testHasRoleWithoutRoles()
    {
        (new Role)
            ->whereIn("name", ["Member", "SuperAdmin"])
            ->delete();

        $this->assertFalse($this->user->hasRole("Member"));
    }

    public function testHasRoleWhereUserHasNoRole()
    {
        $this->user->roles()->sync([]);

        $this->assertFalse($this->user->hasRole("Member"));
    }
}
