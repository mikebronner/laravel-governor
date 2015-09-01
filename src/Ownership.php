<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Ownership
 * @package GeneaLabs\LaravelGovernor\Models
 */
class Ownership extends Model
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
		return $this->hasMany(Permission::class, 'ownership_key');
	}
}
