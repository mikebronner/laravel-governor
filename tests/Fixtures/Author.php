<?php namespace GeneaLabs\LaravelGovernor\Tests\Fixtures;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use Governable;

    protected $fillable = [
        "name",
    ];
}
