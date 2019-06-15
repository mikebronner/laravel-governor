<?php namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Support\Collection;
use ReflectionObject;

trait EntityManagement
{
    protected function getEntity(string $policyClassName) : string
    {
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $nameSpaceParts = collect(explode('\\', $policyClassName));
        $policyClass = $nameSpaceParts->last();
        $entityName = str_replace('Policy', '', $policyClass);
        $entityName = trim(implode(" ", preg_split('/(?=[A-Z])/', $entityName)));

        if (! str_contains($policyClassName, "App")) {
            $nameSpaceParts->shift();
            $packageName = $nameSpaceParts->shift();
            $packageName = trim(implode(" ", preg_split('/(?=[A-Z])/', $packageName)));
            $entityName .= " ({$packageName})";
        }

        $entity = (new $entityClass)->firstOrCreate([
            "name" => ucwords($entityName),
        ]);

        return $entity->name;
    }

    protected function getEntityFromModel(string $modelClass) : string
    {
        return $this->getEntity($this->getPolicies()->get($modelClass, ""));
    }

    protected function getPolicies() : Collection
    {
        $gate = app('Illuminate\Contracts\Auth\Access\Gate');
        $reflectedGate = new ReflectionObject($gate);
        $policies = $reflectedGate->getProperty("policies");
        $policies->setAccessible(true);

        return collect($policies->getValue($gate));
    }

    protected function parsePolicies()
    {
        $this->getPolicies()
            ->each(function ($policyClassName) {
                $this->getEntity($policyClassName);
            });
    }
}
