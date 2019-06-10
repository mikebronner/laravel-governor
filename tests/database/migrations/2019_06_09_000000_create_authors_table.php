<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthorsTable extends Migration
{
    public function up()
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger("governor_owned_by")
                ->nullable();
            $table->string('name');
            $table->timestamps();
        });
    }
}
