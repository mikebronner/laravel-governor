<?php

use GeneaLabs\Bones\Keeper\Models\Entity;
use Illuminate\Database\Seeder;

class BonesKeeperEntitiesTableSeeder extends Seeder {
    public function run()
    {
        Entity::create(['name' => 'role']);
        Entity::create(['name' => 'entity']);
        Entity::create(['name' => 'permission']);
        Entity::create(['name' => 'assignment']);
    }
}
