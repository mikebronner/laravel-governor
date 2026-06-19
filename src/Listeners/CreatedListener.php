<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\GovernorOwnable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CreatedListener
{
    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        if (Str::contains($event, "Hyn\Tenancy\Models\Website")
            || Str::contains($event, "Hyn\Tenancy\Models\Hostname")
        ) {
            return;
        }

        collect($models)
            ->filter(function ($model) {
                return $model instanceof Model;
            })
            ->each(function ($model) {
                $this->assignDefaultRole($model);
                $this->createOwnershipRecord($model);
            });
    }

    protected function assignDefaultRole(Model $model): void
    {
        if (get_class($model) !== config('genealabs-laravel-governor.models.auth')) {
            return;
        }

        try {
            $model->roles()->syncWithoutDetaching('Member');
        } catch (\Exception $exception) {
            $roleClass = config("genealabs-laravel-governor.models.role");
            (new $roleClass)->firstOrCreate([
                'name' => 'Member',
                'description' => 'Represents the baseline registered user. Customize permissions as best suits your site.',
            ]);
            $model->roles()->attach('Member');
        }
    }

    protected function createOwnershipRecord(Model $model): void
    {
        if (! in_array(
            'GeneaLabs\LaravelGovernor\Traits\Governable',
            class_uses_recursive($model),
        )) {
            return;
        }

        $ownerId = null;

        // Use the column value if explicitly set (deprecated, but maintained for
        // backward compatibility). Read raw attributes directly so we don't trigger
        // the polymorphic governorOwner accessor while the record is still being created.
        $attributes = $model->getAttributes();

        if (isset($attributes['governor_owned_by'])) {
            $ownerId = $attributes['governor_owned_by'];
        }

        if (! $ownerId && $this->shouldAssignAuthenticatedOwner()) {
            $ownerId = auth()->user()->id;
        }

        if (! $ownerId) {
            return;
        }

        $ownableClass = config(
            "genealabs-laravel-governor.models.ownable",
            GovernorOwnable::class,
        );

        // Write on the governed model's own connection so the ownership row
        // lands in the same database governorOwner() reads from — the MorphOne
        // resolves GovernorOwnable on the parent model's connection. A
        // default-connection write would orphan ownership for any governed
        // model on a non-default (e.g. tenant) connection.
        //
        // Store the morph class (alias under a registered morph map, FQCN
        // otherwise) so writes match how the governorOwner() MorphOne reads
        // the relationship — without this, ownership silently breaks under a
        // morph map.
        //
        // updateOrCreate (not firstOrCreate) re-attributes a reused primary key
        // to the current owner instead of silently inheriting a stale orphan
        // row's owner if one survived a prior delete.
        (new $ownableClass)
            ->setConnection($model->getConnectionName())
            ->updateOrCreate(
                [
                    'ownable_type' => $model->getMorphClass(),
                    'ownable_id' => $model->getKey(),
                ],
                [
                    'user_id' => $ownerId,
                ],
            );
    }

    protected function shouldAssignAuthenticatedOwner(): bool
    {
        if (! auth()->check()) {
            return false;
        }

        // Guard against attributing ownership to a leaked auth user in queue or
        // console contexts, where the wildcard eloquent.created listener may
        // fire without a genuine request-bound user. The package's own tests
        // run in the console but rely on the acting user, so allow them.
        //
        // Limitation: queue:work runs in the console, so Governable models
        // created inside queued jobs get NO automatic ownership row. To assign
        // ownership in a queue/console context, set governor_owned_by explicitly
        // on the model before saving — createOwnershipRecord() honors an explicit
        // column value in any context (see above), so that path is unaffected by
        // this guard. This limitation is documented in the README upgrade guide.
        return ! app()->runningInConsole() || app()->runningUnitTests();
    }
}
