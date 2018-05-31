<?php namespace GeneaLabs\LaravelGovernor\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;
use Illuminate\Support\Facades\Gate;

class Auth extends AuthServiceProvider
{
    protected $policies = [
        'GeneaLabs\LaravelGovernor\Assignment' => 'GeneaLabs\LaravelGovernor\Policies\Assignment',
        'GeneaLabs\LaravelGovernor\Entity' => 'GeneaLabs\LaravelGovernor\Policies\Entity',
        'GeneaLabs\LaravelGovernor\Role' => 'GeneaLabs\LaravelGovernor\Policies\Role',
    ];

    public function register()
    {
        $this->registerPolicies();
    }
}
