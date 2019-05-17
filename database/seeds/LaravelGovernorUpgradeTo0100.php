<?php

use Illuminate\Database\Seeder;

class LaravelGovernorUpgradeTo0100 extends Seeder
{
    public function run()
    {
        if (Schema::hasTable('permissions')) {
            app("db")
                ->table("permissions")
                ->where("role_key", "NOT LIKE", "SuperAdmin")
                ->get()
                ->each(function ($permission) {
                    app("db")
                        ->table("governor_permissions")
                        ->insert([
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
                    app("db")
                        ->table("governor_role_user")
                        ->insert([
                            "role_name" => $roleUser->role_key,
                            "user_id" => $roleUser->user_id,
                        ]);
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
