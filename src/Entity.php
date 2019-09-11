<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entity extends Model
{
    protected $keyType = 'string';
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_entities,name',
    ];
    protected $fillable = [
        'name',
    ];
    protected $table = "governor_entities";

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-entities");
        });

        static::deleted(function () {
            app("cache")->forget("governor-entities");
        });

        static::saved(function () {
            app("cache")->forget("governor-entities");
        });

        static::updated(function () {
            app("cache")->forget("governor-entities");
        });
    }

    public function group() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.group')
        );
    }

    public function permissions() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission'),
            'entity_name'
        );
    }
}
