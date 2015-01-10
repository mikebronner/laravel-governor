<?php

use GeneaLabs\Bones\Keeper\Entities\Entity;

class BonesKeeperEntitiesTableSeeder extends Seeder {
    public function run()
    {
        Entity::create(['name' => 'role']);
        Entity::create(['name' => 'entity']);
        Entity::create(['name' => 'permission']);
        Entity::create(['name' => 'assignments']);
    }
}
