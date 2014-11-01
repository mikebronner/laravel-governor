<?php

use GeneaLabs\Bones\Keeper\Role;
use KoNB\User;

class BonesKeeperUserTableSeeder extends Seeder {
    public function run()
    {
        $user = \App::make(Config::get('auth.model'));
        $userId = $user->min($user['primaryKey']);
        $role = Role::create([
            'id' => '0',
            'name' => 'Superadmin',
            'description' => 'This role is for the main administrator of your site. They will be able to absolutely everything.',
        ]);
        $role->users()->attach($userId);
        $role->save();
        Role::create([
            'id' => '0',
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);
    }
}
