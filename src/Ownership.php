<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ownership extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3',
    ];
    protected $fillable = [
        'name',
    ];

    public function permissions() : HasMany
    {
        return $this->hasMany(Permission::class, 'ownership_key');
    }
}
