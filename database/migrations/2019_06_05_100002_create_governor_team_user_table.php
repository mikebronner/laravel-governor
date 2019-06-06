<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorTeamUserTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::create('governor_team_user', function (Blueprint $table) {
            $user = app(config('genealabs-laravel-governor.models.auth'));

            $table->string('team_name')
                ->index();
            $table->unsignedBigInteger('user_id')
                ->index();
            $table->timestamps();

            $table->foreign('team_name')
                ->references('name')
                ->on('governor_teams')
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
