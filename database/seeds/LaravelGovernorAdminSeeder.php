<?php

use Illuminate\Database\Seeder;

class LaravelGovernorAdminSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.models.auth'));

        $roleClass = config("genealabs-laravel-governor.models.role");
        $adminRole = (new $roleClass)->firstOrCreate([
            'name' => 'Admin',
            'description' => 'This role is for the administrators of your site. You can configure what they have access to.',
        ]);
        $memberRole = (new $roleClass)->firstOrCreate([
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);

        $admins = config('genealabs-laravel-governor.admins');
        $admins = json_decode($admins);

        if (! is_array($admins)) {
            return;
        }

        foreach ($admins as $admin) {
            if ($admin->email) {
                $adminUser = $users
                    ->firstOrNew([
                        "email" => $admin->email,
                    ]);

                if (!$adminUser->exists) {
                    $adminUser->fill([
                        "name" => $admin->name,
                        "password" => bcrypt($admin->password),
                    ]);
                    $adminUser->save();
                }

                $adminUser->roles()->syncWithoutDetaching([$adminRole->name, $memberRole->name]);
            }
        }
    }
}
