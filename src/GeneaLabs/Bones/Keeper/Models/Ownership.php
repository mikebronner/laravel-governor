<?php namespace GeneaLabs\Bones\Keeper\Models;

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
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'ownership_key');
	}
}
