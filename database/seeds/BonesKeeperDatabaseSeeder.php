<?php

use Illuminate\Database\Seeder;

class BonesKeeperDatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        $this->call('BonesKeeperEntitiesTableSeeder');
        $this->call('BonesKeeperActionsTableSeeder');
        $this->call('BonesKeeperOwnershipsTableSeeder');
        $this->call('BonesKeeperRolesTableSeeder');
        $this->call('BonesKeeperPermissionsTableSeeder');
    }

}
