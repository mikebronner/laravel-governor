<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorPermissionsTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::create('governor_permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('role_name');
            $table->string('entity_name');
            $table->string('action_name');
            $table->string('ownership_name');
            $table->timestamps();

            $table->unique(['role_name', 'entity_name', 'action_name', 'ownership_name']);
            $table->foreign('role_name')
                ->references('name')
                ->on('governor_roles')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->foreign('entity_name')
                ->references('name')
                ->on('governor_entities')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->foreign('action_name')
                ->references('name')
                ->on('governor_actions')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->foreign('ownership_name')
                ->references('name')
                ->on('governor_ownerships')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('governor_permissions');
    }
}
