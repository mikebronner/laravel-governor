<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddTeamToPermissionsTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::table("governor_permissions", function (Blueprint $table) {
            $table->dropUnique([
                'role_name',
                'entity_name',
                'action_name',
                'ownership_name',
            ]);
        });
        Schema::table("governor_permissions", function (Blueprint $table) {
            $table->string("role_name")
                ->nullable()
                ->change();
            $table->unsignedBigInteger("team_id")
                ->nullable();
            $table->unique([
                "team_id",
                'role_name',
                'entity_name',
                'action_name',
                'ownership_name',
            ]);
        });
    }

    public function down()
    {
        // TODO
    }
}
