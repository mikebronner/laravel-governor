<?php

use Illuminate\Database\Seeder;

class LaravelGovernorOwnershipsTableSeeder extends Seeder
{
    public function run()
    {
        $ownershipClass = config("laravel-governor.models.ownership");
        (new $ownershipClass)->firstOrCreate(['name' => 'any']);
        (new $ownershipClass)->firstOrCreate(['name' => 'own']);
        (new $ownershipClass)->firstOrCreate(['name' => 'other']);
    }
}
