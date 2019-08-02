<?php

use Illuminate\Database\Seeder;
use function GuzzleHttp\json_decode;

class LaravelGovernorSuperAdminSeeder extends Seeder
{
    public function run()
    {
        $users = app()->make(config('genealabs-laravel-governor.models.auth'));

        $roleClass = config("genealabs-laravel-governor.models.role");
        $superAdminRole = (new $roleClass)->firstOrCreate([
            'name' => 'SuperAdmin',
            'description' => 'This role is for the main administrator of your site. They will be able to do absolutely everything. (This role cannot be edited.)',
        ]);
        $memberRole = (new $roleClass)->firstOrCreate([
            'name' => 'Member',
            'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
        ]);

        $superadmins = config('genealabs-laravel-governor.superadmins');

        if (! is_array($superadmins)) {
            return;
        }

        $superadmins = json_decode($superadmins);

        foreach ($superadmins as $superadmin) {
            $superUserEmail = array_get($superadmin, "email");

            if ($superUserEmail) {
                $superuser = $users
                    ->firstOrNew([
                        "email" => $superUserEmail,
                    ]);

                if (!$superuser->exists) {
                    $superuser->fill([
                        "name" => array_get($superadmin, "name"),
                        "password" => bcrypt(array_get($superadmin, "password")),
                    ]);
                    $superuser->save();
                }
                $superuser->roles()->syncWithoutDetaching([$superAdminRole->name, $memberRole->name]);
            }
        }
    }
}
