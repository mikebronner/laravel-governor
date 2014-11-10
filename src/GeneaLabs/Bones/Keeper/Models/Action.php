<?php namespace GeneaLabs\Bones\Keeper\Models;

use GeneaLabs\Bones\Keeper\BonesKeeperBaseModel;

/**
 * Class Action
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Action extends BonesKeeperBaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
//        'name' => 'required|min:3|unique:actions,name',
        'name' => 'required|min:3',
	];

    /**
     * @var array
     */
    protected $fillable = [
		'name',
	];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'action_key');
	}
}
