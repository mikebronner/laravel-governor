<?php

use App\Governor\Team;
use Illuminate\Database\Seeder;

class LaravelGovernorEntitiesTableSeeder extends Seeder
{
    public function run()
    {
        (new Team)->parsePolicies();
    }
}
