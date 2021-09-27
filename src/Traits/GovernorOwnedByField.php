<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Traits;

use GeneaLabs\LaravelGovernor\Policies\BasePolicy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;

trait GovernorOwnedByField
{
    protected function createGovernorOwnedByFieldsByPolicy(BasePolicy $policy) : bool
    {
        $gate = app("Illuminate\Contracts\Auth\Access\Gate");
        $reflection = new ReflectionClass($gate);
        $property = $reflection->getProperty('policies');
        $property->setAccessible(true);
        $protectedClass = collect($property->getValue($gate))
            ->flip()
            ->get(get_class($policy));

        if (! $protectedClass) {
            return false;
        }

        $model = new $protectedClass;

        return $this->createGovernorOwnedByFields($model);
    }

    protected function createGovernorOwnedByFields(Model $model): bool
    {
        if (! in_array("GeneaLabs\\LaravelGovernor\\Traits\\Governable", class_uses_recursive($model))) {
            return false;
        }

        $connection = $model
            ->getConnection()
            ->getName();
        $table = $model->getTable();

        $governorOwnedByExists = Cache::remember(
            "{$connection}{$table}governor_owned_by",
            30,
            function () use ($connection, $model, $table) {
                return Schema::connection($connection)
                    ->hasColumn($model->getTable(), 'governor_owned_by');
            },
        );

        if ($governorOwnedByExists) {
            return false;
        }

        Cache::delete("{$connection}{$table}governor_owned_by");

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

        return true;
    }
}
