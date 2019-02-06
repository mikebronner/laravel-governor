<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePermissions extends Migration
{
    public function up()
    {
        $actionClass = config("genealabs-laravel-governor.models.action");
        (new $actionClass)
            ->whereIn("name", ["edit", "inspect", "change", "remove"])
            ->delete();
        (new LaravelGovernorDatabaseSeeder)
            ->run();

        Schema::table('roles', function (Blueprint $table) {
            $table->string('description')->nullable()->change();
        });
    }
}
