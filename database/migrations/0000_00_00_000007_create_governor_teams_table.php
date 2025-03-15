<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGovernorTeamsTable extends Migration
{
    public function __construct()
    {
        if (app()->bound("Hyn\Tenancy\Environment")) {
            $this->connection = config("tenancy.db.tenant-connection-name");
        }
    }

    public function up(): void
    {
        Schema::create('governor_teams', function (Blueprint $table): void {
            $user = app(config('genealabs-laravel-governor.models.auth'));
            $table->bigIncrements("id");
            $table->unsignedBigInteger("governor_owned_by")
                ->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->string('name');
            $table->text("description")
                ->nullable();

            $table->foreign('governor_owned_by')
                ->references($user->getKeyName())
                ->on($user->getTable())
                ->onDelete('SET NULL')
                ->onUpdate('CASCADE');
        });
    }

    public function down(): void
    {
        Schema::drop('governor_teams');
    }
}
