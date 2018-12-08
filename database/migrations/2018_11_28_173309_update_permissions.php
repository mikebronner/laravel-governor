<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use GeneaLabs\LaravelGovernor\Action;

class UpdatePermissions extends Migration
{
    public function up()
    {
        (new Action)
            ->whereIn("name", ["edit", "inspect", "change", "remove"])
            ->delete();
        (new LaravelGovernorDatabaseSeeder)
            ->run();

        Schema::table('roles', function (Blueprint $table) {
            $table->string('description')->nullable()->change();
        });
    }
}
