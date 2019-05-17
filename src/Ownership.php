<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ownership extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_ownerships,name',
    ];
    protected $fillable = [
        'name',
    ];
    protected $table = "governor_ownerships";

    public function permissions() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission'),
            'ownership_name'
        );
    }
}
