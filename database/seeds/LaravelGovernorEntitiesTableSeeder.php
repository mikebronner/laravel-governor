<?php

use GeneaLabs\LaravelGovernor\Entity;
use Illuminate\Database\Seeder;

class LaravelGovernorEntitiesTableSeeder extends Seeder {
    public function run()
    {
        Entity::create(['name' => 'role']);
        Entity::create(['name' => 'entity']);
        Entity::create(['name' => 'permission']);
        Entity::create(['name' => 'assignment']);
    }
}
