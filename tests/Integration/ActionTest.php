<?php namespace GeneaLabs\LaravelGovernor\Tests\Integration\Notifications;

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;

class ActionTest extends UnitTestCase
{
    public function testPermissionsRelationship()
    {
        $permission = (new Permission)->firstOrCreate([
            "role_name" => "Member",
            "entity_name" => "author",
            "action_name" => "create",
            "ownership_name" => "any",
        ]);
        $action = (new Action)
            ->where("name", "create")
            ->first();

        $this->assertTrue($action->permissions->contains($permission));
    }
}
