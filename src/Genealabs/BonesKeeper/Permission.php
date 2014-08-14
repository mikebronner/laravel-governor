<?php namespace Genealabs\BonesKeeper;

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
		return $this->belongsToMany('Genealabs\BonesKeeper\Role')->withTimestamps();
	}
}
