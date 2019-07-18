<?php

use Illuminate\Database\Seeder;

class LaravelGovernorSuperAdminSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.models.auth'));
        $superUserEmail = config('genealabs-laravel-governor.superadmin.email');
        $superuser = null;

        if ($superUserEmail) {
            $superuser = $users
                ->firstOrNew([
                    "email" => $superUserEmail,
                ]);

            if (! $superuser->exists) {
                $superuser->fill([
                    "name" => config('genealabs-laravel-governor.superadmin.name'),
                    "password" => bcrypt(config('genealabs-laravel-governor.superadmin.password')),
                ]);
                $superuser->save();
            }
        }

        $roleClass = config("genealabs-laravel-governor.models.role");
        $superAdminRole = (new $roleClass)->firstOrCreate([
            'name' => 'SuperAdmin',
            'description' => 'This role is for the main administrator of your site. They will be able to do absolutely everything. (This role cannot be edited.)',
        ]);
        $memberRole = (new $roleClass)->firstOrCreate([
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);

        if ($superuser) {
            $superuser->roles()->syncWithoutDetaching([$superAdminRole->name, $memberRole->name]);
        }
    }
}
