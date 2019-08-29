<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;

class LaravelGovernorUpgradeTo0120 extends Seeder
{
    public function run()
    {
        Schema::table('governor_role_user', function (Blueprint $table) {
            if (! Schema::hasColumn("governor_role_user", "id")) {
                $table->bigIncrements("id");
            }

            $table->string('role_name')
                ->change();
            $table->unsignedBigInteger('user_id')
                ->change();
            
            if (! Schema::hasColumn("governor_role_user", "created_at")) {
                $table->timestamps();
            }
            // $table->dropIndex("role_name");
            $table->dropIndexIfExists("governor_role_user_role_name_index");
            // $table->dropIndex("user_id");
            $table->dropIndexIfExists("governor_role_user_user_id_index");
        });
    }
}
