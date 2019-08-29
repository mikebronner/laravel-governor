<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use GeneaLabs\LaravelOptimizedPostgres\Schema;

class LaravelGovernorUpgradeTo0115 extends Seeder
{
    public function run()
    {
        Schema::table("governor_permissions", function (Blueprint $table) {
            $table->dropIndexIfExists("governor_permissions_role_name_entity_name_action_name_ownership_name_unique");
        });
        Schema::table("governor_permissions", function (Blueprint $table) {
            $table->string("role_name")
                ->nullable()
                ->change();
            if (! Schema::hasColumn("governor_permissions", "team_id")) {
                $table->unsignedBigInteger("team_id")
                    ->nullable();
                $table->unique([
                    "team_id",
                    'role_name',
                    'entity_name',
                    'action_name',
                    'ownership_name',
                ]);
            }
        });
    }
}
