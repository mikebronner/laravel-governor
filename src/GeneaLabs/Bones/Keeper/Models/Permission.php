<?php namespace GeneaLabs\Bones\Keeper\Models;

class Permission extends \BaseModel
{
	protected $rules = [];
	protected $fillable = [];

	public function role()
	{
		return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Role', 'role_key', 'name');
	}

    public function entity()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Entity', 'entity_key', 'name');
    }

    public function action()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Action', 'action_key', 'name');
    }

    public function ownership()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Ownership', 'ownership_key', 'name');
    }
}
