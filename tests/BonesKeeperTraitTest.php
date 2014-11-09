<?php

use \GeneaLabs\Bones\Keeper\BonesKeeperTrait;
use \Illuminate\Support\Facades\Input;
use \Illuminate\Support\Facades\Validator;

class BonesKeeperTraitTest extends \PHPUnit_Framework_TestCase
{
    public $trait;

    public function setUp()
    {
        $this->trait = Mockery::mock('BonesKeeperTraitStub')->makePartial();
    }

    public function tearDown()
    {
        Mockery::close();
    }

    public function testPermissionCheckDefaultsToFalse()
    {
        $this->assertFalse($this->trait->hasPermissionTo('view', 'any', 'role'));
    }
}

class BonesKeeperTraitStub
{
    use GeneaLabs\Bones\Keeper\BonesKeeperTrait;
}
