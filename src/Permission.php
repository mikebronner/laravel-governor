<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends Model
{
    protected $rules = [
        'entity_name' => 'required',
        'action_name' => 'required',
        'ownership_name' => 'required',
    ];
    protected $fillable = [
        'role_name',
        'entity_name',
        'action_name',
        'ownership_name',
        "team_id",
    ];
    protected $table = "governor_permissions";

    public static function boot()
    {
        parent::boot();

        static::created(function () {
            app("cache")->forget("governor-permissions");
        });

        static::deleted(function () {
            app("cache")->forget("governor-permissions");
        });

        static::saved(function () {
            app("cache")->forget("governor-permissions");
        });

        static::updated(function () {
            app("cache")->forget("governor-permissions");
        });
    }

    public function entity() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.entity'),
            'entity_name'
        );
    }

    public function action() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.action'),
            'action_name'
        );
    }

    public function ownership() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.ownership'),
            'ownership_name'
        );
    }

    public function role() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.role'),
            'role_name'
        );
    }

    public function team() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.team')
        );
    }

    public function getFilteredBy(string $filter = null, string $value = null) : Collection
    {
        return $this
            ->where(function ($query) use ($filter, $value) {
                if ($filter) {
                    $query->where($filter, $value);
                }
            })
            ->get();
    }
}
