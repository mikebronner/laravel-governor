<?php namespace GeneaLabs\LaravelGovernor\Tests\Fixtures;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;

class AuthorWithoutPolicy extends Author
{
    protected $table = "authors";
}
