<?php namespace GeneaLabs\Bones\Keeper\Models;

/**
 * Class Role
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Role extends \BaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rulesets = [
        'name' => 'required|min:3|unique:roles,name',
        'description' => 'required|min:10',
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
		return $this->belongsToMany(\Config::get('auth.model'), 'role_user', 'role_key', 'user_id');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'role_key');
	}
}
