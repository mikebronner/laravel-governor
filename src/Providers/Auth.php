<?php namespace GeneaLabs\LaravelGovernor\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class Auth extends AuthServiceProvider
{
    protected $policies = [
        'GeneaLabs\LaravelGovernor\Action' => 'GeneaLabs\LaravelGovernor\Policies\Action',
        'GeneaLabs\LaravelGovernor\Assignment' => 'GeneaLabs\LaravelGovernor\Policies\Assignment',
        'GeneaLabs\LaravelGovernor\Entity' => 'GeneaLabs\LaravelGovernor\Policies\Entity',
        'GeneaLabs\LaravelGovernor\Group' => 'GeneaLabs\LaravelGovernor\Policies\Group',
        'GeneaLabs\LaravelGovernor\Ownership' => 'GeneaLabs\LaravelGovernor\Policies\Ownership',
        'GeneaLabs\LaravelGovernor\Permission' => 'GeneaLabs\LaravelGovernor\Policies\Permission',
        'GeneaLabs\LaravelGovernor\Role' => 'GeneaLabs\LaravelGovernor\Policies\Role',
        'GeneaLabs\LaravelGovernor\Team' => 'GeneaLabs\LaravelGovernor\Policies\Team',
        'GeneaLabs\LaravelGovernor\TeamInvitation' => 'GeneaLabs\LaravelGovernor\Policies\TeamInvitation',
    ];

    public function register()
    {
        $this->registerPolicies();
    }
}
