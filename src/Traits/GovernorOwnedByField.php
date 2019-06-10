<?php namespace GeneaLabs\LaravelGovernor\Traits;

use GeneaLabs\LaravelGovernor\Policies\BasePolicy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;

trait GovernorOwnedByField
{
    protected function createGovernorOwnedByFieldsByPolicy(BasePolicy $policy)
    {
        $gate = app("Illuminate\Contracts\Auth\Access\Gate");
        $reflection = new ReflectionClass($gate);
        $property = $reflection->getProperty('policies');
        $property->setAccessible(true);
        $protectedClass = collect($property->getValue($gate))
            ->flip()
            ->get(get_class($policy));
        $model = new $protectedClass;
        $this->createGovernorOwnedByFields($model);
    }

    protected function createGovernorOwnedByFields(Model $model)
    {
        if (! in_array("GeneaLabs\\LaravelGovernor\\Traits\\Governable", class_uses_recursive($model))) {
            return;
        }

        $connection = $model
            ->getConnection()
            ->getName();
        $governorOwnedByExists = app("cache")
            ->rememberForever("governor-{$model->getTable()}-table-check-ownedby-field", function () use ($connection, $model) {
                return Schema::connection($connection)
                    ->hasColumn($model->getTable(), 'governor_owned_by');
            });
        
        if ($governorOwnedByExists) {
            return;
        }

        Schema::connection($connection)->table($model->getTable(), function (Blueprint $table) {
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
        app("cache")->forget("governor-{$model->getTable()}-table-check-ownedby-field");
    }
}
