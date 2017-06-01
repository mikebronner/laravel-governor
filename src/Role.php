<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:roles,name',
        'description' => 'required|min:25',
    ];
    protected $fillable = [
        'name',
        'description',
    ];

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(config('genealabs-laravel-governor.authModel'), 'role_user', 'role_key', 'user_id');
    }

    public function permissions() : HasMany
    {
        return $this->hasMany(Permission::class, 'role_key');
    }
}
