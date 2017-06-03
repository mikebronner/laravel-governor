<?php namespace GeneaLabs\LaravelGovernor\Listeners;

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
        foreach ($models as $model) {
            if (auth()->check() && ! (property_exists($model, 'isGoverned') && $model['isGoverned'] === false)) {
                $model->governor_created_by = auth()->user()->getKey();
                $table = $model->getTable();

                if (! Schema::hasColumn($table, 'governor_created_by')) {
                    Schema::table($table, function (Blueprint $table) {
                        $table->integer('governor_created_by')->unsigned()->nullable();
                    });
                }
            }
        }
    }
}
