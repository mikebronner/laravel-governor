<?php

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use Illuminate\Database\Seeder;

class LaravelGovernorOwnershipsTableSeeder extends Seeder
{
    public function run()
    {
        $ownershipClass = config("genealabs-laravel-governor.models.ownership");
        (new $ownershipClass)->firstOrCreate(['name' => 'any']);
        (new $ownershipClass)->firstOrCreate(['name' => 'own']);
        (new $ownershipClass)->firstOrCreate(['name' => 'other']);
    }
}
