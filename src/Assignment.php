<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    protected $roles;
    protected $table ="governor_role_user";
    protected $users;

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-assignments");
        });

        static::deleted(function () {
            app("cache")->forget("governor-assignments");
        });

        static::saved(function () {
            app("cache")->forget("governor-assignments");
        });

        static::updated(function () {
            app("cache")->forget("governor-assignments");
        });
    }

    public function __construct()
    {
        parent::__construct();

        $this->users = app(config('genealabs-laravel-governor.models.auth'));
        $this->roles = app(config('genealabs-laravel-governor.models.role'));
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(config('genealabs-laravel-governor.models.role'));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(config("genealabs-laravel-governor.models.auth"));
    }

    public function addAllUsersToMemberRole()
    {
        $this->users
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
                $this->users
                    ->with('roles')
                    ->find($id)
                    ->roles()
                    ->detach();
            }

            $this->roles
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

            $this->roles
                ->with('users')
                ->find($role)
                ->users()
                ->attach($users);
        }
    }

    public function removeAllUsersFromRoles()
    {
        $this->roles
            ->with('users')
            ->get()
            ->each(function ($role) {
                $role->users()->detach();
            });
    }


    public function getAllUsersOfRole($role)
    {
        return $this->roles
            ->with('users')
            ->find($role)
            ->users;
    }
}
