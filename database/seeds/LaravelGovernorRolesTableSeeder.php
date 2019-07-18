<?php

use Illuminate\Database\Seeder;

class LaravelGovernorRolesTableSeeder extends Seeder
{
    public function run()
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        (new $roleClass)->firstOrCreate([
            'name' => 'SuperAdmin',
            'description' => 'This role is for the main administrator of your site. They will be able to do absolutely everything. (This role cannot be edited.)',
        ]);
        (new $roleClass)->firstOrCreate([
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);
    }
}
