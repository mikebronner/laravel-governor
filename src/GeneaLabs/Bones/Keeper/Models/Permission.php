<?php namespace GeneaLabs\Bones\Keeper\Models;

use GeneaLabs\Bones\Marshal\BonesMarshalBaseModel;

/**
 * Class Permission
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Permission extends BonesMarshalBaseModel
{
    /**
     * @var array
     */
    protected $rules = [
        'role_key' => 'required',
        'entity_key' => 'required',
        'action_key' => 'required',
        'ownership_key' => 'required',
    ];

    /**
     * @var array
     */
    protected $fillable = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
	{
		return $this->belongsTo('GeneaLabs\Bones\Keeper\Roles\Role', 'role_key', 'name');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function entity()
    {
        return $this->belongsTo('GeneaLabs\Bones\Keeper\Entities\Entity', 'entity_key', 'name');
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
