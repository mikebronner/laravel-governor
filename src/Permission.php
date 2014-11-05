<?php namespace GeneaLabs\Bones\Keeper;

class Permission extends \BaseModel
{
	protected $rules = [];
	protected $fillable = [];

	public function role()
	{
		return $this->belongsTo('GeneaLabs\Bones\Keeper\Role', 'role_key', 'name');
	}

    public function entity()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Entity', 'entity_key', 'name');
    }

    public function action()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Action', 'action_key', 'name');
    }

    public function ownership()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Ownership', 'ownership_key', 'name');
    }
}
