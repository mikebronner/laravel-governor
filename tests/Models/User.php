<?php namespace GeneaLabs\LaravelGovernor\Tests\Models;

use GeneaLabs\LaravelGovernor\Traits\Governing;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Governing;
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getIsSuperAdminAttribute() : bool
    {
        return $this->roles->contains("SuperAdmin");
    }
}
