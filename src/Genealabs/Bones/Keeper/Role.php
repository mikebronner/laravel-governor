<?php namespace GeneaLabs\Bones\Keeper;

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
		return $this->belongsTo(Config::get('auth.model'));
	}

	public function permissions()
	{
		return $this->belongsToMany('GeneaLabs\Bones\Keeper\Permission');
	}
}
