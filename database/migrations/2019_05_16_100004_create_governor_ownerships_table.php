<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorOwnershipsTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        Schema::create('governor_ownerships', function (Blueprint $table) {
            $table->string('name')
                ->unique()
                ->primary();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('governor_ownerships');
    }
}
