<?php

use GeneaLabs\Bones\Keeper\BonesKeeperTrait;

class BonesKeeperTraitTest extends PHPUnit_Framework_TestCase
{
    private $traitObject;

    public function setUp()
    {
        $this->traitObject = new BonesKeeperTraitImplementer();
        // set upd database
    }

    /** @test */
    public function it_has_permission_to_view_any_role()
    {

    }
}

class BonesKeeperTraitImplementer
{
    use BonesKeeperTrait;
}