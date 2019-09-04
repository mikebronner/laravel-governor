<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $keyType = 'string';
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_roles,name',
        'description' => 'required|min:25',
    ];
    protected $fillable = [
        'name',
        'description',
    ];
    protected $table = "governor_roles";

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-roles");
        });

        static::deleted(function () {
            app("cache")->forget("governor-roles");
        });

        static::saved(function () {
            app("cache")->forget("governor-roles");
        });

        static::updated(function () {
            app("cache")->forget("governor-roles");
        });
    }

    public function entities() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.entity'),
            "entity_name"
        );
    }

    public function permissions() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission'),
            'role_name'
        );
    }

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(
            config('genealabs-laravel-governor.models.auth'),
            'governor_role_user',
            'role_name',
            'user_id'
        );
    }

    public function getCached() : Collection
    {
        return app("cache")->remember("governor-roles", 300, function () {
            $roleClass = config("genealabs-laravel-governor.models.role");
            
            return (new $roleClass)
                ->orderBy("name")
                ->get();
        });
    }
}
