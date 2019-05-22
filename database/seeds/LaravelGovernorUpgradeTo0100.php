<?php

use Illuminate\Database\Seeder;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;

class LaravelGovernorUpgradeTo0100 extends Seeder
{
    public function run()
    {
        if (Schema::hasTable("entities")) {
            app("db")
                ->table("entities")
                ->get()
                ->each(function ($entity) {
                    (new Entity)->firstOrCreate([
                        "name" => $entity->name,
                    ]);
                });
        }

        if (Schema::hasTable('permissions')) {
            app("db")
                ->table("permissions")
                ->where("role_key", "NOT LIKE", "SuperAdmin")
                ->get()
                ->each(function ($permission) {
                    (new Permission)->firstOrCreate([
                        "role_name" => $permission->role_key,
                        "action_name" => $permission->action_key,
                        "entity_name" => $permission->entity_key,
                        "ownership_name" => $permission->ownership_key,
                    ]);
                });
        }
        
        if (Schema::hasTable('role_user')) {
            app("db")
                ->table("role_user")
                ->get()
                ->each(function ($roleUser) {
                    (new Role)
                        ->find($roleUser->role_key)
                        ->users()
                        ->syncWithoutDetaching($roleUser->user_id);
                });
        }

        if (Schema::hasTable('role_user')) {
            Schema::drop('role_user');
        }

        if (Schema::hasTable('permissions')) {
            Schema::drop('permissions');
        }
        
        if (Schema::hasTable('roles')) {
            Schema::drop('roles');
        }
        
        if (Schema::hasTable('actions')) {
            Schema::drop('actions');
        }
        
        if (Schema::hasTable('entities')) {
            Schema::drop('entities');
        }

        if (Schema::hasTable('ownerships')) {
            Schema::drop('ownerships');
        }
    }
}
