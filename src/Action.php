<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Action extends Model
{
    protected $keyType = 'string';
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_actions,name',
    ];
    protected $fillable = [
        'name',
    ];
    protected $table = "governor_actions";

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-actions");
        });

        static::deleted(function () {
            app("cache")->forget("governor-actions");
        });

        static::saved(function () {
            app("cache")->forget("governor-actions");
        });

        static::updated(function () {
            app("cache")->forget("governor-actions");
        });
    }

    public function permissions() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission'),
            'action_name'
        );
    }
}
