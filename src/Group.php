<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_groups,name',
    ];
    protected $fillable = [
        'name',
    ];
    protected $table = "governor_groups";

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-groups");
        });

        static::deleted(function () {
            app("cache")->forget("governor-groups");
        });

        static::saved(function () {
            app("cache")->forget("governor-groups");
        });

        static::updated(function () {
            app("cache")->forget("governor-groups");
        });
    }

    public function entities() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.entity'),
            'group_name'
        );
    }

    public function getCached() : Collection
    {
        return app("cache")->remember("governor-groups", 300, function () {
            $groupClass = app(config('genealabs-laravel-governor.models.group'));
            
            return (new $groupClass)
                ->with("entities")
                ->orderBy("name")
                ->get();
        });
    }
}
