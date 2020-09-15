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
        $superadmins = config('genealabs-laravel-governor.superadmins');
        $superadmins = json_decode($superadmins);

        if (!is_array($superadmins)) {
            return;
        }

        foreach ($superadmins as $superadmin) {
            if ($superadmin->email) {
                $superuser = $users
                    ->firstOrNew([
                        "email" => $superadmin->email,
                    ]);

                if (!$superuser->exists) {
                    $superuser->fill([
                        "name" => $superadmin->name,
                        "password" => bcrypt($superadmin->password),
                    ]);
                    $superuser->save();
                }
                $superuser->roles()->syncWithoutDetaching([$superAdminRole->name, $memberRole->name]);
            }
        }
    }
}
