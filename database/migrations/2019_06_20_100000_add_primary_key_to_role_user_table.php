<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddPrimaryKeyToRoleUserTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::table('governor_role_user', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string('role_name')
                ->change();
            $table->unsignedBigInteger('user_id')
                ->change();
            $table->timestamps();
            // $table->dropIndex("role_name");
            // $table->dropIndex("user_id");
        });
    }

    public function down()
    {
        //
    }
}
