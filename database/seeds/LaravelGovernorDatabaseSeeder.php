<?php

use Illuminate\Database\Seeder;

class LaravelGovernorDatabaseSeeder extends Seeder
{
    public function run()
    {
        Eloquent::unguard();

        $this->call('LaravelGovernorEntitiesTableSeeder');
        $this->call('LaravelGovernorActionsTableSeeder');
        $this->call('LaravelGovernorOwnershipsTableSeeder');
        $this->call('LaravelGovernorRolesTableSeeder');

        Eloquent::reguard();
    }
}
