<?php

class BonesKeeperDatabaseSeeder extends \Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        $this->call('BonesKeeperPermissionsTableSeeder');
        $this->call('BonesKeeperRolesTableSeeder');
        $this->call('BonesKeeperRolesPermissionsTableSeeder');
        $this->call('BonesKeeperRolesUsersTableSeeder');
    }

}
