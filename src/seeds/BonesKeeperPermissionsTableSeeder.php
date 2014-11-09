<?php

use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Entity;
use GeneaLabs\Bones\Keeper\Models\Ownership;
use GeneaLabs\Bones\Keeper\Models\Permission;
use GeneaLabs\Bones\Keeper\Models\Role;

class BonesKeeperPermissionsTableSeeder extends Seeder {
    public function run()
    {
        $superadmin = Role::whereName('SuperAdmin')->get()->first();
        $actions = Action::all();
        $ownership = Ownership::whereName('any')->get()->first();
        $entities = Entity::all();
        foreach ($entities as $entity) {
            foreach ($actions as $action) {
//                foreach ($ownerships as $ownership) {
                    $permission = new Permission();
                    $permission->role()->associate($superadmin);
                    $permission->action()->associate($action);
                    $permission->ownership()->associate($ownership);
                    $permission->entity()->associate($entity);
                    $permission->save();
//                    $superadmin->permissions()->attach($permission);
//                }
            }
        }
//        $superadmin->save();
    }
}
