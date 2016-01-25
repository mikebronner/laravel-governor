<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

class CreateRolesUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('role_user', function(Blueprint $table)
        {
            $user = app(config('auth.model'));
            $table->string('role_key')->index();
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('role_key')->references('name')->on('roles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references($user->getKeyName())->on($user->getTable())->onDelete('cascade')->onUpdate('cascade');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('role_user');
	}
}
