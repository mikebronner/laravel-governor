<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('permissions', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('role_key');
            $table->string('entity_key');
            $table->string('action_key');
            $table->string('ownership_key');
            $table->unique(['role_key', 'entity_key', 'action_key', 'ownership_key']);
            $table->foreign('role_key')->references('name')->on('roles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('entity_key')->references('name')->on('entities')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('action_key')->references('name')->on('actions')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ownership_key')->references('name')->on('ownerships')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('permissions');
	}

}
