<?php

return [
    'layoutView' => 'bones-keeper::layout',
    'displayNameField' => 'email',
    'eventListeners' => [
        'GeneaLabs.Bones.Keeper.Roles.*' => 'GeneaLabs\Bones\Keeper\Roles\RoleEventListener',
        'GeneaLabs.Bones.Keeper.Entities.*' => 'GeneaLabs\Bones\Keeper\Entities\EntityEventListener',
        'GeneaLabs.Bones.Keeper.Assignments.*' => 'GeneaLabs\Bones\Keeper\Assignments\AssignmentEventListener',
//        'GeneaLabs\Bones\Keeper\Actions\ActionEventListener',
//        'GeneaLabs\Bones\Keeper\Ownerships\OwnershipEventListener',
//        'GeneaLabs\Bones\Keeper\Permissions\PermissionEventListener',
    ]
];
