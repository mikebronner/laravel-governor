<?php

use Faker\Generator as Faker;
use GeneaLabs\LaravelGovernor\Team;

$factory->define(Team::class, function (Faker $faker) {
    return [
        "name" => $faker->words(1, 1),
        "description" => $faker->sentence(),
    ];
});
