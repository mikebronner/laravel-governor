<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

class Ownership extends Model
{
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3',
	];
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
