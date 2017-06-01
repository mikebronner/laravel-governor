<?php

use GeneaLabs\LaravelGovernor\Ownership;
use Illuminate\Database\Seeder;

class LaravelGovernorOwnershipsTableSeeder extends Seeder
{
    public function run()
    {
        (new Ownership)->firstOrCreate(['name' => 'any']);
        (new Ownership)->firstOrCreate(['name' => 'own']);
        (new Ownership)->firstOrCreate(['name' => 'other']);
    }
}
