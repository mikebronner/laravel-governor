<?php

use GeneaLabs\Bones\Keeper\Entity;

class BonesKeeperEntitiesTableSeeder extends Seeder {
    public function run()
    {
        Entity::create(['name' => 'role']);
        Entity::create(['name' => 'permission']);
    }
}
