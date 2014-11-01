<?php

use GeneaLabs\Bones\Keeper\Permission;
use GeneaLabs\Bones\Keeper\Role;

class BonesKeeperPermissionsTableSeeder extends Seeder {
    public function run()
    {
        $superAdmin = Role::find(0);
        $permission = Permission::create([
            'action' => 'create',
            'ownership' => 'any',
            'entity' => 'role',
            'description' => 'Can create roles?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'view',
            'ownership' => 'any',
            'entity' => 'role',
            'description' => 'Can view all roles?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'inspect',
            'ownership' => 'any',
            'entity' => 'role',
            'description' => 'Can inspect a specific role?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'edit',
            'ownership' => 'any',
            'entity' => 'role',
            'description' => 'Can edit roles?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'delete',
            'ownership' => 'any',
            'entity' => 'role',
            'description' => 'Can remove roles?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'create',
            'ownership' => 'any',
            'entity' => 'permission',
            'description' => 'Can create permissions?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'view',
            'ownership' => 'any',
            'entity' => 'permission',
            'description' => 'Can view permissions?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'inspect',
            'ownership' => 'any',
            'entity' => 'permission',
            'description' => 'Can inspect a specific permission?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'edit',
            'ownership' => 'any',
            'entity' => 'permission',
            'description' => 'Can edit permissions?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $permission = Permission::create([
            'action' => 'delete',
            'ownership' => 'any',
            'entity' => 'permission',
            'description' => 'Can remove permissions?',
        ]);
        $superAdmin->permissions()->associate($permission);
        $superAdmin->save();
    }
}
