<?php

use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Seeder;

class LaravelGovernorPermissionsTableSeeder extends Seeder {
    public function run()
    {
        $superadmin = Role::whereName('SuperAdmin')->get()->first();
        $actions = Action::all();
        $ownership = Ownership::whereName('any')->get()->first();
        $entities = Entity::all();
        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                $permission = new Permission();
                $permission->role()->associate($superadmin);
                $permission->action()->associate($action);
                $permission->ownership()->associate($ownership);
                $permission->entity()->associate($entity);
                $permission->save();
            }
        }
    }
}
