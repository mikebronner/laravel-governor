<?php

use GeneaLabs\LaravelGovernor\Action;
use Illuminate\Database\Seeder;

class LaravelGovernorActionsTableSeeder extends Seeder {
    public function run()
    {
        Action::create(['name' => 'create']);
        Action::create(['name' => 'view']);
        Action::create(['name' => 'inspect']);
        Action::create(['name' => 'edit']);
        Action::create(['name' => 'remove']);
    }
}
