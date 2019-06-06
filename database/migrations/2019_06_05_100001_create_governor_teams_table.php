<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorTeamsTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::create('governor_teams', function (Blueprint $table) {
            $user = app(config('genealabs-laravel-governor.models.auth'));
            $table->bigIncrements("id");
            $table->unsignedBigInteger("governor_owned_by")
                ->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->string('team_name');

            $table->foreign('governor_owned_by')
                ->references($user->getKeyName())
                ->on($user->getTable())
                ->onDelete('SET NULL')
                ->onUpdate('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('governor_teams');
    }
}
