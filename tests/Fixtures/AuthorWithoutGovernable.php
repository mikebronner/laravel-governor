<?php namespace GeneaLabs\LaravelGovernor\Tests\Fixtures;

use Illuminate\Database\Eloquent\Model;

class AuthorWithoutGovernable extends Model
{
    protected $fillable = [
        "name",
    ];
    protected $table = "authors";
}
