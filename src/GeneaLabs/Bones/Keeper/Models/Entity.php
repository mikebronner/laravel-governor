<?php namespace GeneaLabs\Bones\Keeper\Models;

class Entity extends \BaseModel
{
    protected $primaryKey = 'name';
    protected $rulesets = [
        'name' => 'required|min:3|unique:entities,name',
	];

	protected $fillable = [
		'name',
	];

	public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'entity_key');
	}
}
