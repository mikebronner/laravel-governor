<?php namespace Genealabs\BonesKeeper;

class Role extends \BaseModel
{
	protected $rulesets = [
		'saving' => [
			'name' => 'required|min:3|unique:roles,name',
			'description' => 'required|min:10',
		],
	];

	protected $fillable = [
		'name',
		'description',
	];

	public function users()
	{
		return $this->hasMany('User');
	}

	public function permissions()
	{
		return $this->belongsToMany('Genealabs\BonesKeeper\Permission');
	}
}
