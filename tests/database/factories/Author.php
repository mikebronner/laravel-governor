<?php

use Faker\Generator as Faker;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;

$factory->define(Author::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
