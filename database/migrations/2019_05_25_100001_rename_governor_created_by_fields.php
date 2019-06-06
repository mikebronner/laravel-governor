<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;

class RenameGovernorCreatedByFields extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.tenant-connection-name");
        }
    }

    public function up()
    {
        $this
            ->getTableNames()
            ->each(function ($tableName) {
                if (Schema::hasColumn($tableName, 'governor_created_by')) {
                    if (Schema::hasColumn($tableName, 'governor_owned_by')) {
                        app("db")
                            ->table($tableName)
                            ->whereNotNull("governor_created_by")
                            ->update([
                                "governor_owned_by" => "governor_created_by",
                            ]);
                        Schema::table($tableName, function (Blueprint $table) {
                            $table->dropColumn("governor_created_by");
                        });

                        return;
                    }

                    Schema::table($tableName, function (Blueprint $table) {
                        $table->renameColumn("governor_created_by", "governor_owned_by");
                    });
                }
            });
    }

    public function down()
    {
        $this
            ->getTableNames()
            ->each(function ($tableName) {
                if (Schema::hasColumn($tableName, 'governor_owned_by')) {
                    Schema::table($tableName, function (Blueprint $table) {
                        $table->renameColumn("governor_owned_by", "governor_created_by");
                    });
                }
            });
    }

    protected function getTableNames() : Collection
    {
        return collect(app("db")
            ->getDoctrineSchemaManager()
            ->listTableNames());
    }
}
