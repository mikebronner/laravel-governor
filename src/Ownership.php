<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
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

    public function getCached() : Collection
    {
        return app("cache")->remember("governor-ownerships", 300, function () {
            $ownershipClass = app(config('genealabs-laravel-governor.models.ownership'));
            
            return (new $ownershipClass)
                ->orderBy("name")
                ->get();
        });
    }
}
