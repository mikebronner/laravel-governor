<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

/**
 * Class Role
 * @package GeneaLabs\LaravelGovernor\Models
 */
class Role extends Model
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
        'name' => 'required|min:3|unique:roles,name',
        'description' => 'required|min:25',
    ];

    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(Config::get('auth.model'), 'role_user', 'role_key', 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'role_key');
    }
}
