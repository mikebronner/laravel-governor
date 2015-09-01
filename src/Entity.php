<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Entity
 * @package GeneaLabs\LaravelGovernor\Entities
 */
class Entity extends Model
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
        'name' => 'required|min:3|unique:entities,name',
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
        return $this->hasMany(Permission::class, 'entity_key');
    }
}
