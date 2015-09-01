<?php

use GeneaLabs\LaravelGovernor\Models\Ownership;
use Illuminate\Database\Seeder;

class BonesKeeperOwnershipsTableSeeder extends Seeder {
    public function run()
    {
        Ownership::create(['name' => 'any']);
        Ownership::create(['name' => 'own']);
        Ownership::create(['name' => 'other']);
    }
}
