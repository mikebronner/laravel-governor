<?php

use Illuminate\Database\Seeder;

class LaravelGovernorRolesTableSeeder extends Seeder
{
    public function run()
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        (new $roleClass)
            ->firstOrCreate([
                'name' => 'SuperAdmin',
            ])
            ->fill([
                'description' => 'This role is for the main super-administrator of your site. They will be able to do absolutely everything. (This role cannot be edited.)',
            ]);
        (new $roleClass)
            ->firstOrCreate([
                'name' => 'Admin',
            ])
            ->fill([
                'description' => 'This role is for the administrators of your site. You can configure what they have access to.',
            ]);
        (new $roleClass)
            ->firstOrCreate([
                'name' => 'Member',
            ])
            ->fill([
                'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
            ]);
        (new $roleClass)
            ->firstOrCreate([
                'name' => 'Guest',
            ])
            ->fill([
                'description' => 'Represents the any user visiting the site that is not logged in.',
            ]);
    }
}
