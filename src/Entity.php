<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entity extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:entities,name',
    ];
    protected $fillable = [
        'name',
    ];

    public function permissions() : HasMany
    {
        return $this->hasMany(Permission::class, 'entity_key');
    }
}
