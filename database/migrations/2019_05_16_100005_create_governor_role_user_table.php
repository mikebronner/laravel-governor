<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorRoleUserTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::create('governor_role_user', function (Blueprint $table) {
            $user = app()->make(config('genealabs-laravel-governor.models.auth'));
            $table->string('role_name')
                ->index();
            $table->bigInteger('user_id')
                ->unsigned()
                ->index();
            $table->foreign('role_name')
                ->references('name')
                ->on('governor_roles')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->foreign('user_id')
                ->references($user->getKeyName())
                ->on($user->getTable())
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('governor_role_user');
    }
}
