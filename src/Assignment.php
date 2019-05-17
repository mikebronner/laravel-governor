<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    protected $primaryKey = ["role", "user_id"];
    protected $roles;
    protected $table ="governor_role_user";
    protected $user;

    public function __construct()
    {
        parent::__construct();

        $this->user = app(config('genealabs-laravel-governor.models.auth'));
        $this->roles = config('genealabs-laravel-governor.models.role');
        $this->roles = new $this->roles;
    }

    public function role() : BelongsTo
    {
        return $this->belongsTo(config('genealabs-laravel-governor.models.role'));
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(config("genealabs-laravel-governor.models.auth"));
    }

    public function addAllUsersToMemberRole()
    {
        $this->user
            ->with('roles')
            ->get()
            ->each(function ($user) {
                if (! $user->roles->contains('Member')) {
                    $user->roles()->attach('Member');
                }
            });
    }

    public function removeAllSuperAdminUsersFromOtherRoles($assignedUsers)
    {
        $role = 'SuperAdmin';

        if (array_key_exists($role, $assignedUsers)) {
            $users = $assignedUsers[$role];

            foreach ($users as $id) {
                $this->user
                    ->with('roles')
                    ->find($id)
                    ->roles()
                    ->detach();
            }

            (new $this->roles)
                ->with('users')
                ->find($role)
                ->users()
                ->attach($users);
        }
    }

    public function assignUsersToRoles($assignedUsers)
    {
        foreach ($assignedUsers as $role => $users) {
            if ($role === 'SuperAdmin' || $role === 'Member') {
                continue;
            }

            (new $this->roles)
                ->with('users')
                ->find($role)
                ->users()
                ->attach($users);
        }
    }

    public function removeAllUsersFromRoles()
    {
        (new $this->roles)
            ->with('users')
            ->get()
            ->each(function ($role) {
                $role->users()->detach();
            });
    }


    public function getAllUsersOfRole($role)
    {
        return (new $this->roles)
            ->with('users')
            ->find($role)
            ->users;
    }
}
