<?php

use GeneaLabs\LaravelGovernor\Models\Action;
use Illuminate\Database\Seeder;

class BonesKeeperActionsTableSeeder extends Seeder {
    public function run()
    {
        Action::create(['name' => 'add']);
        Action::create(['name' => 'view']);
        Action::create(['name' => 'inspect']);
        Action::create(['name' => 'change']);
        Action::create(['name' => 'remove']);
    }
}
