<?php

use Illuminate\Database\Seeder;

class LaravelGovernorPermissionsTableSeeder extends Seeder
{
    public function run()
    {
        $actionClass = config("laravel-governor.models.action");
        $entityClass = config("laravel-governor.models.entity");
        $ownershipClass = config("laravel-governor.models.ownership");
        $permissionClass = config("laravel-governor.models.permission");
        $roleClass = config("laravel-governor.models.role");

        $superadmin = (new $roleClass)->whereName('SuperAdmin')->get()->first();
        $actions = (new $actionClass)->all();
        $ownership = (new $ownershipClass)->whereName('any')->get()->first();
        $entities = (new $entityClass)->all();

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                (new $permissionClass)->firstOrCreate([
                    "role_key" => $superadmin->name,
                    "action_key" => $action->name,
                    "ownership_key" => $ownership->name,
                    "entity_key" => $entity->name,
                ]);
            }
        }
    }
}
