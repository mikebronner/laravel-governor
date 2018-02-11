<?php namespace GeneaLabs\LaravelGovernor\Tests\App;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Governable;
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getIsSuperAdminAttribute() : bool
    {
        return true;
    }
}
