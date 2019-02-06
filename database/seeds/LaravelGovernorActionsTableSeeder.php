<?php

use Illuminate\Database\Seeder;

class LaravelGovernorActionsTableSeeder extends Seeder
{
    public function run()
    {
        $actionClass = config("laravel-governor.models.action");
        $action = $actionClass;
        $action->firstOrCreate(['name' => 'create']);
        $action->firstOrCreate(['name' => 'delete']);
        $action->firstOrCreate(['name' => 'forceDelete']);
        $action->firstOrCreate(['name' => 'restore']);
        $action->firstOrCreate(['name' => 'update']);
        $action->firstOrCreate(['name' => 'view']);
        $action->firstOrCreate(['name' => 'viewAny']);
    }
}
