<?php namespace GeneaLabs\Bones\Keeper\Models;

/**
 * Class Ownership
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Ownership extends \BaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rulesets = [
        'name' => 'required|min:3|unique:roles,name',
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
