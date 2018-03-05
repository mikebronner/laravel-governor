<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatingListener
{
    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(string $event, array $models)
    {
        collect($models)
            ->filter(function ($model) {
                return $model instanceof Model;
            })
            ->each(function ($model) {
                if (auth()->check()
                    && ! (property_exists($model, 'isGoverned')
                        && $model['isGoverned'] === false)
                ) {
                    $model->governor_created_by = auth()->user()->getKey();
                    $table = $model->getTable();

                    if (! Schema::hasColumn($table, 'governor_created_by')) {
                        Schema::table($table, function (Blueprint $table) {
                            $table->integer('governor_created_by')->unsigned()->nullable();
                        });
                    }
                }
            });
    }
}
