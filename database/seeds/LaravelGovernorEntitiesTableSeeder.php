<?php

use Illuminate\Database\Seeder;

class LaravelGovernorEntitiesTableSeeder extends Seeder
{
    public function run()
    {
        $entityClass = config("genealabs-laravel-governor.models.entity");
        (new $entityClass)->firstOrCreate(['name' => 'role']);
        (new $entityClass)->firstOrCreate(['name' => 'entity']);
        (new $entityClass)->firstOrCreate(['name' => 'permission']);
        (new $entityClass)->firstOrCreate(['name' => 'assignment']);
    }
}
