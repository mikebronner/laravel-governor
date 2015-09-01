<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Action
 * @package GeneaLabs\LaravelGovernor\Models
 */
class Action extends Model
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
        return $this->hasMany(Permission::class, 'action_key');
    }
}
