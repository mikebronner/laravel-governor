<?php namespace GeneaLabs\Bones\Keeper\Models;

/**
 * Class Permission
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Permission extends \BaseModel
{
    /**
     * @var array
     */
    protected $rules = [];
    /**
     * @var array
     */
    protected $fillable = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
	{
		return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Role', 'role_key', 'name');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function entity()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Entity', 'entity_key', 'name');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function action()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Action', 'action_key', 'name');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ownership()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Models\Ownership', 'ownership_key', 'name');
    }
}
