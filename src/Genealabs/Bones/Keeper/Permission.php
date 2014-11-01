<?php namespace GeneaLabs\Bones\Keeper;

class Permission extends \BaseModel
{
	protected $rules = [
		'action' => 'required',
		'ownership' => 'required',
		'entity' => 'required',
		'description' => 'required|min:3',
	];

	protected $fillable = [
		'action',
		'ownership',
		'entity',
		'description',
	];

	public function roles()
	{
		return $this->belongsToMany('GeneaLabs\Bones\Keeper\Role')->withTimestamps();
	}
}
