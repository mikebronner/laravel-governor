<?php

use GeneaLabs\Bones\Keeper\Ownership;

class BonesKeeperOwnershipsTableSeeder extends Seeder {
    public function run()
    {
        Ownership::create(['name' => 'any']);
        Ownership::create(['name' => 'own']);
        Ownership::create(['name' => 'other']);
    }
}
