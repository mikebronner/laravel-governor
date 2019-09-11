<?php namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use Governable;

    protected $rules = [
        'name' => 'required|min:3',
        'description' => 'string',
    ];
    protected $fillable = [
        'name',
        'description',
    ];
    protected $table = "governor_teams";

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-teams");
        });

        static::deleted(function () {
            app("cache")->forget("governor-teams");
        });

        static::saved(function () {
            app("cache")->forget("governor-teams");
        });

        static::updated(function () {
            app("cache")->forget("governor-teams");
        });
    }

    public function members() : BelongsToMany
    {
        return $this->belongsToMany(
            config('genealabs-laravel-governor.models.auth'),
            "governor_team_user",
            "team_id",
            "user_id"
        );
    }

    public function invitations() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.invitation'),
            "team_id"
        );
    }

    public function permissions() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission')
        );
    }
}
