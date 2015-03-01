<?php namespace GeneaLabs\Bones\Keeper;

use GeneaLabs\Bones\Keeper\Models\Action;
use GeneaLabs\Bones\Keeper\Models\Entity;
use GeneaLabs\Bones\Keeper\Models\Permission;

class BonesKeeperHelper
{
    public static function resetSuperAdminPermissions()
    {
        Permission::where('role_key', 'SuperAdmin')->delete();
        $entities = Entity::all();
        $actions = Action::all();
        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                Permission::updateOrCreate([
                    'role_key' => 'SuperAdmin',
                    'entity_key' => $entity->name,
                    'action_key' => $action->name,
                    'ownership_key' => 'any',
                ]);
            }
        }
    }
}
