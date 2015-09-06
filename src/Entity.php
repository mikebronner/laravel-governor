<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:entities,name',
    ];
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
