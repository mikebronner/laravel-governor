<?php namespace GeneaLabs\Bones\Keeper\Models;

class Action extends \BaseModel
{
    protected $primaryKey = 'name';
	protected $rulesets = [
        'name' => 'required|min:3|unique:actions,name',
	];

	protected $fillable = [
		'name',
	];

	public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'action_key');
	}
}
