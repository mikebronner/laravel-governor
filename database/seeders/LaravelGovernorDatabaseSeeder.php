<?php

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class LaravelGovernorDatabaseSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        $this->call(LaravelGovernorEntitiesTableSeeder::class);
        $this->call(LaravelGovernorActionsTableSeeder::class);
        $this->call(LaravelGovernorOwnershipsTableSeeder::class);
        $this->call(LaravelGovernorRolesTableSeeder::class);
        $this->call(LaravelGovernorSuperAdminSeeder::class);
        $this->call(LaravelGovernorAdminSeeder::class);
        $this->call(OwnedBySeeder::class);

        Model::reguard();
    }
}
