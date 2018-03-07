<?php

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Seeder;

class LaravelGovernorPermissionsTableSeeder extends Seeder
{
    public function run()
    {
        $superadmin = (new Role)->whereName('SuperAdmin')->get()->first();
        $actions = (new Action)->all();
        $ownership = (new Ownership)->whereName('any')->get()->first();
        $entities = (new Entity)->all();

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                (new Permission)->firstOrCreate([
                    "role_key" => $superadmin->name,
                    "action_key" => $action->name,
                    "ownership_key" => $ownership->name,
                    "entity_key" => $entity->name,
                ]);
            }
        }
    }
}
