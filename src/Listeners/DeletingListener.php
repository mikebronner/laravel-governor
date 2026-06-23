<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\GovernorOwnable;
use Illuminate\Database\Eloquent\Model;

class DeletingListener
{
    public function handle(string $event, array $models): void
    {
        collect($models)
            ->filter(function ($model) {
                return $model instanceof Model
                    && in_array(
                        'GeneaLabs\LaravelGovernor\Traits\Governable',
                        class_uses_recursive($model),
                    );
            })
            ->each(function (Model $model): void {
                $this->removeOwnershipRecord($model);
            });
    }

    protected function removeOwnershipRecord(Model $model): void
    {
        // A soft delete keeps the record recoverable, so its ownership row must
        // survive for a later restore. Only a hard/force delete removes the row.
        if (
            method_exists($model, 'isForceDeleting')
            && ! $model->isForceDeleting()
        ) {
            return;
        }

        $ownableClass = config(
            "genealabs-laravel-governor.models.ownable",
            GovernorOwnable::class,
        );

        // Remove the orphaned polymorphic ownership row on the governed model's
        // own connection (matching how it was written), keyed by the morph class
        // so it resolves correctly under a registered morph map. Without this an
        // orphan row outlives the model and — if its primary key is later reused
        // — could mis-attribute ownership of the new record.
        (new $ownableClass)
            ->setConnection($model->getConnectionName())
            ->where('ownable_type', $model->getMorphClass())
            ->where('ownable_id', $model->getKey())
            ->delete();
    }
}
