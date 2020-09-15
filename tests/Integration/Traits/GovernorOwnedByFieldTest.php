<?php

namespace GeneaLabs\LaravelGovernor\Tests\Integration\Traits;

use GeneaLabs\LaravelGovernor\Tests\Fixtures\AuthorWithoutGovernable;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Policies\Author as AuthorPolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use GeneaLabs\LaravelGovernor\Traits\GovernorOwnedByField;

class GovernorOwnedByFieldTest extends UnitTestCase
{
    use GovernorOwnedByField;

    public function testUsingPolicy()
    {
        $result = $this->createGovernorOwnedByFieldsByPolicy(new AuthorPolicy);

        $this->assertFalse($result);
    }

    public function testUsingNonGovernableModel()
    {
        $result = $this->createGovernorOwnedByFields(new AuthorWithoutGovernable);

        $this->assertFalse($result);
    }

    public function testUsingPolicyWhereModelDoesntHaveGovernorOwnedByField()
    {
        $result = $this->createGovernorOwnedByFields(new User);

        $this->assertTrue($result);
    }
}
