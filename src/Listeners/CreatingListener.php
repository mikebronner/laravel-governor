<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\Traits\GovernorOwnedByField;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CreatingListener
{
    use GovernorOwnedByField;

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
                return $model instanceof Model
                    && in_array(
                        "GeneaLabs\\LaravelGovernor\\Traits\\Governable",
                        class_uses_recursive($model)
                    );
            })
            ->filter()
            ->each(function ($model) {
                $this->createGovernorOwnedByFields($model);
                $model->getEntityFromModel(get_class($model));

                if (! $model->governor_owned_by
                    && auth()->check()
                ) {
                    $model->governor_owned_by = auth()->user()->id;
                }
            });
    }
}
