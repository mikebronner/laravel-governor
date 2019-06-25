<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\Traits\GovernorOwnedByField;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class CreatingListener
{
    use GovernorOwnedByField;

    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        if (str_contains($event, "Hyn\Tenancy\Models\Website")
            || str_contains($event, "Hyn\Tenancy\Models\Hostname")
            || ! Schema::hasTable('governor_roles')
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
            ->each(function ($model) {
                $this->createGovernorOwnedByFields($model);

                if (auth()->check()) {
                    $model->governor_owned_by = auth()->user()->id;
                }
            });
    }
}
