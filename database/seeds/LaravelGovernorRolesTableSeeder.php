<?php

use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Seeder;

class LaravelGovernorRolesTableSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.auth-model'));
        $superuser = $users->find($users->min($users->getKeyName()));

        $role = (new Role)->firstOrCreate([
            'name' => 'SuperAdmin',
            'description' => 'This role is for the main administrator of your site. They will be able to do absolutely everything. (This role cannot be edited.)',
        ]);
        $role->users()->attach($superuser);
        (new Role)->firstOrCreate([
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);
    }
}
