<?php

class PracticeTest extends PHPUnit_Framework_TestCase
{
    public function testHelloWorld()
    {
        $greeting = 'Hello, World.';
        $this->assertTrue($greeting === 'Hello, World.');
    }
}
