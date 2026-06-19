<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Relations\TeamMembersRelation;
use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

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

    public function invitations(): HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.invitation'),
            "team_id"
        );
    }

    /**
     * @deprecated Use governorOwner() relationship instead.
     */
    public function owner(): BelongsTo
    {
        $authClass = config("genealabs-laravel-governor.models.auth");

        return $this->belongsTo($authClass, "governor_owned_by", "id");
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(
            config('genealabs-laravel-governor.models.auth'),
            "governor_team_user",
            "team_id",
            "user_id"
        );
    }

    protected function newBelongsToMany(
        Builder $query,
        Model $parent,
        $table,
        $foreignPivotKey,
        $relatedPivotKey,
        $parentKey,
        $relatedKey,
        $relationName = null,
    ): BelongsToMany {
        if ($table === 'governor_team_user') {
            return new TeamMembersRelation(
                $query,
                $parent,
                $table,
                $foreignPivotKey,
                $relatedPivotKey,
                $parentKey,
                $relatedKey,
                $relationName,
            );
        }

        return parent::newBelongsToMany(
            $query,
            $parent,
            $table,
            $foreignPivotKey,
            $relatedPivotKey,
            $parentKey,
            $relatedKey,
            $relationName,
        );
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.permission')
        );
    }

    public function removeMember(Model $user): void
    {
        $this->members()->detach($user);
    }

    public function getOwnerNameAttribute(): string
    {
        return $this->governorOwner?->owner?->name
            ?? $this->owner?->name
            ?? "";
    }

    public function transferOwnership(Model $newOwner): self
    {
        $this->loadMissing('members');

        $ownableClass = config(
            "genealabs-laravel-governor.models.ownable",
            \GeneaLabs\LaravelGovernor\GovernorOwnable::class,
        );

        // Wrap both stores in a transaction so the polymorphic record and the
        // deprecated column never disagree on the owner if the save throws.
        DB::transaction(function () use ($newOwner, $ownableClass): void {
            // Update polymorphic ownership on the team's own connection so the
            // write lands in the same database governorOwner() reads from — the
            // MorphOne resolves GovernorOwnable on the parent's connection, so a
            // default-connection write would be invisible for a team on a
            // non-default connection. Store the morph class so the write matches
            // how governorOwner() reads under a registered morph map.
            (new $ownableClass)
                ->setConnection($this->getConnectionName())
                ->updateOrCreate(
                    [
                        'ownable_type' => $this->getMorphClass(),
                        'ownable_id' => $this->getKey(),
                    ],
                    [
                        'user_id' => $newOwner->getKey(),
                    ],
                );

            // Deprecated: maintain governor_owned_by for backward compatibility
            $this->governor_owned_by = $newOwner->getKey();
            $this->save();
        });

        // Clear cached relationship
        $this->unsetRelation('governorOwner');

        return $this;
    }
}
