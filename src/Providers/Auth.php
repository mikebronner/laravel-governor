<?php namespace GeneaLabs\LaravelGovernor\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class Auth extends AuthServiceProvider
{
    protected $policies = [];

    public function boot()
    {
        $actionClass = config("genealabs-laravel-governor.models.action");
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $groupClass = config("genealabs-laravel-governor.models.group");
        $ownershiplass = config("genealabs-laravel-governor.models.ownership");
        $permissionClass = config("genealabs-laravel-governor.models.permission");
        $roleClass = config("genealabs-laravel-governor.models.role");
        $teamClass = config("genealabs-laravel-governor.models.team");
        $invitationClass = config("genealabs-laravel-governor.models.invitation");
        $this->policies = [
            $actionClass => 'GeneaLabs\LaravelGovernor\Policies\Action',
            $assignmentClass => 'GeneaLabs\LaravelGovernor\Policies\Assignment',
            $entityClass => 'GeneaLabs\LaravelGovernor\Policies\Entity',
            $groupClass => 'GeneaLabs\LaravelGovernor\Policies\Group',
            $ownershiplass => 'GeneaLabs\LaravelGovernor\Policies\Ownership',
            $permissionClass => 'GeneaLabs\LaravelGovernor\Policies\Permission',
            $roleClass => 'GeneaLabs\LaravelGovernor\Policies\Role',
            $teamClass => 'GeneaLabs\LaravelGovernor\Policies\Team',
            $invitationClass => 'GeneaLabs\LaravelGovernor\Policies\TeamInvitation',
        ];
        $this->registerPolicies();
    }
}
