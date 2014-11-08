<?php

namespace spec\GeneaLabs\Bones\Keeper;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class BonesKeeperTraitSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('GeneaLabs\Bones\Keeper\BonesKeeperTrait');
    }
}
