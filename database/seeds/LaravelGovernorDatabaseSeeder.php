<?php

use Illuminate\Database\Seeder;

class LaravelGovernorDatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        $this->call('LaravelGovernorEntitiesTableSeeder');
        $this->call('LaravelGovernorActionsTableSeeder');
        $this->call('LaravelGovernorOwnershipsTableSeeder');
        $this->call('LaravelGovernorRolesTableSeeder');
        $this->call('LaravelGovernorPermissionsTableSeeder');
    }

}
