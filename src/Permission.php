<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Permission extends Model
{
    protected $rules = [
        'role_key' => 'required',
        'entity_key' => 'required',
        'action_key' => 'required',
        'ownership_key' => 'required',
    ];
    protected $fillable = [
        'role_key',
        'entity_key',
        'action_key',
        'ownership_key',
    ];
    protected $table = "governor_permissions";

    public function role() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.role'),
            'role_name'
        );
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
