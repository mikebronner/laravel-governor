<?php namespace GeneaLabs\LaravelGovernor\Traits;

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

    protected function parsePolicies()
    {
        $gate = app('Illuminate\Contracts\Auth\Access\Gate');
        $reflectedGate = new ReflectionObject($gate);
        $policies = $reflectedGate->getProperty("policies");
        $policies->setAccessible(true);
        $policies = $policies->getValue($gate);

        collect($policies)
            ->each(function ($policyClassName) {
                $this->getEntity($policyClassName);
            });
    }
}
