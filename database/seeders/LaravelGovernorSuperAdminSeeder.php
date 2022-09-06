<?php

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use Illuminate\Database\Seeder;

class LaravelGovernorSuperAdminSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.models.auth'));
        $roleClass = config("genealabs-laravel-governor.models.role");
        $superAdminRole = (new $roleClass)->find("SuperAdmin");
        $memberRole = (new $roleClass)->find("Member");
        $superAdmins = config('genealabs-laravel-governor.superadmins');

        if (! $superAdmins) {
            return;
        }

        $superAdmins = json_decode($superAdmins);

        if (! is_array($superAdmins)) {
            return;
        }

        foreach ($superAdmins as $superAdmin) {
            if ($superAdmin->email) {
                $superuser = $users
                    ->firstOrNew([
                        "email" => $superAdmin->email,
                    ]);

                if (!$superuser->exists) {
                    $superuser->fill([
                        "name" => $superAdmin->name,
                        "password" => bcrypt($superAdmin->password),
                    ]);
                    $superuser->save();
                }
                $superuser->roles()->syncWithoutDetaching([$superAdminRole->name, $memberRole->name]);
            }
        }
    }
}
