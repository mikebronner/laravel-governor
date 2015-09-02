<?php

use GeneaLabs\LaravelGovernor\Ownership;
use Illuminate\Database\Seeder;

class LaravelGovernorOwnershipsTableSeeder extends Seeder {
    public function run()
    {
        Ownership::create(['name' => 'any']);
        Ownership::create(['name' => 'own']);
        Ownership::create(['name' => 'other']);
    }
}
