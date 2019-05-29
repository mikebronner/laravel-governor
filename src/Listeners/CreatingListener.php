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
        if (auth()->guest()) {
            return;
        }

        collect($models)
            ->filter(function ($model) {
                return $model instanceof Model;
            })
            ->each(function (Model $model) {
                $model->governor_owned_by = $model
                    ->getAttribute("governor_owned_by", auth()->user()->getKey());
                app("cache")->remember("governor-{$model->getTable()}-table-check-ownedby-field", 300, function () use ($model) {
                    $connection = $model
                        ->getConnection()
                        ->getName();

                    if (! Schema::connection($connection)->hasColumn($model->getTable(), 'governor_owned_by')) {
                        Schema::connection($connection)->table($model->getTable(), function (Blueprint $table) use ($model) {
                            $authModelPrimaryKeyType = config("genealabs-laravel-governor.auth-model-primary-key-type", "bigInteger");
                            $fieldType = "unsigned";

                            switch (strtolower($authModelPrimaryKeyType)) {
                                case "integer":
                                    $fieldType .= "Integer";
                                    break;
                                default:
                                    $fieldType .= "BigInteger";
                                    break;
                            }

                            $table->{$fieldType}('governor_owned_by')
                                ->nullable();
                        });

                        return true;
                    }

                    return false;
                });
            });
    }
}
