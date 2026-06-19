<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soft_deletable_authors', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('governor_owned_by')->nullable();
            $table->string('name')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soft_deletable_authors');
    }
};
