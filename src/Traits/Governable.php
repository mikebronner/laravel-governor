<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

trait Governable
{
    use EntityManagement;

    protected function applyPermissionToQuery(Builder $query, string $ability): Builder
    {
        $entityName = $this->getEntityFromModel(get_class($this));
        $ownerships = $this->getOwnershipsForEntity($entityName, $ability);

        return $this->filterQuery($query, $ownerships);
    }

    protected function filterQuery(Builder $query, Collection $ownerships): Builder
    {
        if ($ownerships->pluck("ownership_name")->contains("any")
            || auth()->user()->hasRole("SuperAdmin")
        ) {
            return $query;
        }

        if ($ownerships->contains("own")) {
            $authModel = config("genealabs-laravel-governor.models.auth");
            $authTable = (new $authModel)->getTable();

            if (method_exists($query->getModel(), "teams")) {

                if ($query->getModel()->getTable() === $authTable) {
                    return $query
                        ->whereHas("teams", function ($query) {
                            $query->whereIn("governor_team_user.user_id", auth()->user()->teams->pluck("id"));
                        })
                        ->orWhere($query->getModel()->getKeyName(), auth()->user()->getKey());
                }

                return $query
                    ->whereHas("teams", function ($query) {
                        $query->whereIn("governor_teamables.team_id", auth()->user()->teams->pluck("id"));
                    })
                    ->orWhere(
                        "{$query->getModel()->getTable()}.governor_owned_by",
                        auth()->user()->getKey()
                    );
            }

            if ($query->getModel()->getTable() === $authTable) {
                return $query->where($query->getModel()->getKeyName(), auth()->user()->getKey());
            }

            return $query->where(
                "{$query->getModel()->getTable()}.governor_owned_by",
                auth()->user()->getKey()
            );
        }

        return $query->whereRaw("1 = 2");
    }

    protected function getOwnershipsForEntity(
        string $entityName,
        string $ability,
    ): Collection {
        if (! $entityName) {
            return collect();
        }

        $permissionClass = app(config('genealabs-laravel-governor.models.permission'));
        $result = Cache::remember(
            "governor-permissions",
            5,
            function () use ($ability, $entityName, $permissionClass) {
                return (new $permissionClass)
                    ->select("ownership_name")
                    ->where("action_name", $ability)
                    ->where("entity_name", $entityName)
                    ->get();
            },
        );

        return $result;
    }

    public function ownedBy(): BelongsTo
    {
        return $this->belongsTo(
            config("genealabs-laravel-governor.models.auth"),
            "governor_owned_by"
        );
    }

    public function teams(): MorphToMany
    {
        return $this->MorphToMany(
            config("genealabs-laravel-governor.models.team"),
            "teamable",
            "governor_teamables"
        );
    }

    public function scopeDeletable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "delete");
    }

    public function scopeForceDeletable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "forceDelete");
    }

    public function scopeRestorable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "restore");
    }

    public function scopeUpdatable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "update");
    }

    public function scopeViewable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "view");
    }

    public function scopeViewAnyable(Builder $query): Builder
    {
        return $this->applyPermissionToQuery($query, "viewAny");
    }
}
