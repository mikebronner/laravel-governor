<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

trait Governable
{
    use EntityManagement;

    protected function applyPermissionToQuery(Builder $query, string $ability): Builder
    {
        $entityName = $this->getEntityFromModel(get_class($this));
        $ownerships = $this->getOwnershipsForEntity($entityName, $ability);

        return $this->filterQuery($query, $ownerships->pluck("ownership_name"));
    }

    protected function filterQuery(Builder $query, Collection $ownerships): Builder
    {
        if (
            $ownerships->contains("any")
            || auth()->user()?->hasRole("SuperAdmin")
        ) {
            return $query;
        }

        if ($ownerships->contains("own")) {
            $authModel = config("genealabs-laravel-governor.models.auth");
            $authTable = (new $authModel)->getTable();
            $model = $query->getModel();

            // The authenticated user's own model is matched directly by primary
            // key — ownership of the user record is the user being themselves,
            // so there is no governor_ownables row (or column) to fall back to.
            if ($model->getTable() === $authTable) {
                if (method_exists($model, "teams")) {
                    return $query
                        ->whereHas("teams", function ($query) {
                            $query->whereIn("governor_team_user.user_id", auth()->user()->teams->pluck("id"));
                        })
                        ->orWhere($model->getKeyName(), auth()->user()->getKey());
                }

                return $query->where(
                    $model->getKeyName(),
                    auth()->user()->getKey(),
                );
            }

            // Governed models: owned via team membership or the polymorphic
            // governorOwner record, with a fallback to the deprecated
            // governor_owned_by column so records not yet migrated by the upgrade
            // seeder still resolve as owned.
            if (method_exists($model, "teams")) {
                $query->whereHas("teams", function ($query) {
                    $query->whereIn("governor_teamables.team_id", auth()->user()->teams->pluck("id"));
                });
            }

            $query->orWhereHas("governorOwner", function ($ownerQuery) {
                $ownerQuery->where("governor_ownables.user_id", auth()->user()->getKey());
            });

            return $this->addLegacyOwnedByFallback($query);
        }

        return $query->whereRaw("1 = 2");
    }

    /**
     * Add an OR clause on the deprecated governor_owned_by column so records
     * whose polymorphic governor_ownables row hasn't been created yet — every
     * existing record before the upgrade seeder runs — still appear in owned
     * scopes, matching the graceful column fallback the rest of the package
     * uses. Guarded by a schema check so models whose table never had the
     * deprecated column don't produce an "unknown column" SQL error.
     */
    protected function addLegacyOwnedByFallback(Builder $query): Builder
    {
        $model = $query->getModel();

        $hasLegacyColumn = Schema::connection($model->getConnectionName())
            ->hasColumn($model->getTable(), "governor_owned_by");

        if ($hasLegacyColumn) {
            $query->orWhere(
                $model->qualifyColumn("governor_owned_by"),
                auth()->user()->getKey(),
            );
        }

        return $query;
    }

    protected function getOwnershipsForEntity(
        string $entityName,
        string $ability,
    ): Collection {
        if (! $entityName) {
            return collect();
        }

        return app("governor-permissions")
            ->where("action_name", $ability)
            ->where("entity_name", $entityName);
    }

    public function governorOwner(): MorphOne
    {
        return $this->morphOne(
            config("genealabs-laravel-governor.models.ownable", \GeneaLabs\LaravelGovernor\GovernorOwnable::class),
            "ownable"
        );
    }

    /**
     * @deprecated Use governorOwner() instead. This method will be removed in a future version.
     *
     * Returns the owning user via the polymorphic governor_ownables table.
     * Previously returned a BelongsTo against the governor_owned_by column.
     */
    public function getOwnedByAttribute(): ?Model
    {
        $ownable = $this->governorOwner;

        if ($ownable) {
            return $ownable->owner;
        }

        return null;
    }

    public function getGovernorOwnedByAttribute()
    {
        $ownable = $this->governorOwner;

        if ($ownable) {
            return $ownable->user_id;
        }

        // Fall back to the deprecated column value if the model has it
        return $this->attributes['governor_owned_by'] ?? null;
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
