<?php

require_once 'vendor/phpunit/phpunit/PHPUnit/Framework/Assert/Functions.php';

use GeneaLabs\Bones\Keeper\Role;

class RoleTest extends PHPUnit_Framework_TestCase
{
    /** @test */
    public function it_works()
    {
        $roles = new Role();
    }
}
 