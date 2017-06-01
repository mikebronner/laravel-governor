<?php

use GeneaLabs\LaravelGovernor\Entity;
use Illuminate\Database\Seeder;

class LaravelGovernorEntitiesTableSeeder extends Seeder
{
    public function run()
    {
        (new Entity)->firstOrCreate(['name' => 'role']);
        (new Entity)->firstOrCreate(['name' => 'entity']);
        (new Entity)->firstOrCreate(['name' => 'permission']);
        (new Entity)->firstOrCreate(['name' => 'assignment']);
    }
}
