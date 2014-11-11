<?php namespace GeneaLabs\Bones\Keeper\Models;

use GeneaLabs\Bones\Marshal\BonesMarshalBaseModel;

/**
 * Class Ownership
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Ownership extends BonesMarshalBaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
//        'name' => 'required|min:3|unique:roles,name',
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
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'ownership_key');
	}
}
