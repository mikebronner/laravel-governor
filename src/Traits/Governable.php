<?php namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;
use ReflectionClass;

trait Governable
{
    protected function applyPermissionToQuery(Builder $query, string $ability) : Builder
    {
        $entityName = $this->getEntityName();
        $ownerships = $this->getOwnershipsForEntity($entityName, $ability);

        return $this->filterQuery($query, $ownerships);
    }

    protected function filterQuery(Builder $query, Collection $ownerships) : Builder
    {
        if ($ownerships->contains("any")) {
            return $query;
        }

        if ($ownerships->contains("own")) {
            $authModel = config("genealabs-laravel-governor.models.auth");
            $authTable = (new $authModel)->getTable();

            if ($query->getModel()->getTable() === $authTable) {
                return $query->where("id", auth()->user()->getKey());
            }
            
            return $query->where("governor_owned_by", auth()->user()->getKey());
        }

        if ($ownerships->contains("no")) {
            return $query->whereRaw("1 = 2");
        }

        return $query;
    }

    protected function getEntityName() : string
    {
        $gate = app("Illuminate\Contracts\Auth\Access\Gate");
        $reflection = new ReflectionClass($gate);
        $property = $reflection->getProperty('policies');
        $property->setAccessible(true);
        $policies = collect($property->getValue($gate));
        $policyClass = $policies->get(get_class($this), "");
        $policyClass = collect(explode('\\', $policyClass))->last();

        return str_replace('policy', '', strtolower($policyClass));
    }

    protected function getOwnershipsForEntity(string $entityName, string $ability) : Collection
    {
        if (! $entityName) {
            return collect();
        }

        $permissionClass = config("genealabs-laravel-governor.models.permission");

        return (new $permissionClass)
            ->where(function ($query) {
                $query->whereIn("role_name", auth()->user()->roles->pluck("name"))
                    ->orWhereIn("team_id", auth()->user()->teams->pluck("id"));
            })
            ->where("action_name", $ability)
            ->where("entity_name", $entityName)
            ->get()
            ->pluck("ownership_name");
    }

    public function ownedBy() : BelongsTo
    {
        return $this->belongsTo(config("genealabs-laravel-governor.models.auth"), "governor_owned_by");
    }

    public function teams() : MorphToMany
    {
        return $this->morphToMany(Team::class, "teamable");
    }

    public function scopeDeletable(Builder $query) : Builder
    {
        return $this->applyPermissionToQuery($query, "delete");
    }

    public function scopeUpdatable(Builder $query) : Builder
    {
        return $this->applyPermissionToQuery($query, "update");
    }

    public function scopeViewable(Builder $query) : Builder
    {
        return $this->applyPermissionToQuery($query, "view");
    }

    public function scopeViewAnyable(Builder $query) : Builder
    {
        return $this->applyPermissionToQuery($query, "viewAny");
    }
}
