<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class LaravelGovernorUpgradeTo0110 extends Seeder
{
    public function run()
    {
        $this
            ->getTableNames()
            ->each(function ($tableName) {
                if (! Schema::hasColumn($tableName, 'governor_created_by')) {
                    return;
                }

                if (Schema::hasColumn($tableName, "governor_owned_by")) {
                    app("db")
                        ->table($tableName)
                        ->where("governor_created_by", ">", 0)
                        ->update([
                            "governor_owned_by" => app("db")->raw("governor_created_by"),
                        ]);
                    Schema::table($tableName, function (Blueprint $table) {
                        $table->dropColumn("governor_created_by");
                    });

                    return;
                }

                Schema::table($tableName, function (Blueprint $table) {
                    $table->renameColumn("governor_created_by", "governor_owned_by");
                });
            });
    }

    protected function getTableNames() : Collection
    {
        return collect(app("db")
            ->getDoctrineSchemaManager()
            ->listTableNames());
    }
}
