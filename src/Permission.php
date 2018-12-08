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

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_key', 'name');
    }

    public function entity() : BelongsTo
    {
        return $this->belongsTo(Entity::class, 'entity_key', 'name');
    }

    public function action() : BelongsTo
    {
        return $this->belongsTo(Action::class, 'action_key', 'name');
    }

    public function ownership() : BelongsTo
    {
        return $this->belongsTo(Ownership::class, 'ownership_key', 'name');
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
