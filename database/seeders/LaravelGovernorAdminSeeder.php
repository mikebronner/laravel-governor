<?php

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use Illuminate\Database\Seeder;

class LaravelGovernorAdminSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.models.auth'));
        $roleClass = config("genealabs-laravel-governor.models.role");
        $adminRole = (new $roleClass)->find("Admin");
        $memberRole = (new $roleClass)->find("Member");
        $admins = config('genealabs-laravel-governor.admins');

        if (! $admins) {
            return;
        }

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
