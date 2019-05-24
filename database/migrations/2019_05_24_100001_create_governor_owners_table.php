<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorOwnersTable extends Migration
{
    public function up()
    {
        Schema::create('governor_owners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('governable_id');
            $table->unsignedBigInteger("user_id")->nullable();
            $table->timestamps();

            $table->string('governable_name');

            $authModel = config("genealabs-laravel-governor.models.auth");
            $authModel = (new $authModel);
            $table->foreign("user_id")
                ->references($authModel->getPrimaryKey())
                ->on($authModel->getTable())
                ->onUpdate("CASCADE")
                ->onDelete("SET NULL");
        });
    }

    public function down()
    {
        Schema::drop('governor_owners');
    }
}
