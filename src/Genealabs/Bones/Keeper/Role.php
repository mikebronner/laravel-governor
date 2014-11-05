<?php namespace GeneaLabs\Bones\Keeper;

class Role extends \BaseModel
{
    protected $primaryKey = 'name';
	protected $rulesets = [
        'name' => 'required|min:3|unique:roles,name',
        'description' => 'required|min:10',
	];

	protected $fillable = [
		'name',
		'description',
	];

	public function users()
	{
		return $this->belongsToMany(\Config::get('auth.model'), 'role_user', 'role_key', 'user_id');
	}

	public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Permission', 'role_key');
	}
}
