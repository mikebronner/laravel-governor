<?php

use GeneaLabs\LaravelGovernor\Action;
use Illuminate\Database\Seeder;

class LaravelGovernorActionsTableSeeder extends Seeder
{
    public function run()
    {
        $action = new Action;
        $action->firstOrCreate(['name' => 'create']);
        $action->firstOrCreate(['name' => 'view']);
        $action->firstOrCreate(['name' => 'inspect']);
        $action->firstOrCreate(['name' => 'edit']);
        $action->firstOrCreate(['name' => 'remove']);
    }
}
