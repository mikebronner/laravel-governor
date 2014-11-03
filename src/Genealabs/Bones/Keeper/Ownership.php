<?php namespace GeneaLabs\Bones\Keeper;

class Ownership extends \BaseModel
{
    protected $primaryKey = 'name';
    protected $rulesets = [
        'name' => 'required|min:3|unique:roles,name',
	];

	protected $fillable = [
		'name',
	];

	public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Permission', 'ownership_key');
	}
}
