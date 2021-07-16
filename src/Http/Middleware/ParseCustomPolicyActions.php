<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Http\Middleware;

use Closure;
use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use ReflectionClass;
use ReflectionMethod;
use ReflectionObject;
use Symfony\Component\HttpFoundation\Response;

class ParseCustomPolicyActions
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! cache()->has('governor.registered-custom-actions')) {
            $this->registerCustomPolicyActions();

            cache()->forever('governor.registered-custom-actions', true);
        }

        return $next($request);
    }

    protected function registerCustomPolicyActions(): void
    {
        $this
            ->getPolicies()
            ->map(function (string $policyClass, string $modelClass): Collection {
                return $this->getCustomActionMethods($policyClass)
                    ->map(function (string $method) use ($modelClass): Action {
                        $action = (new Action)->firstOrCreate([
                            "name" => "{$modelClass}:{$method}",
                        ]);
                        (new Permission)->firstOrCreate([
                            "role_name" => "SuperAdmin",
                            "entity_name" => $action->entity,
                            "action_name" => $action->model_class . ":" . $action->name,
                            "ownership_name" => "any",
                        ]);

                        return $action;
                    });
            })
            ->filter()
            ->toArray();
    }

    protected function getCustomActionMethods(string $policyClass): Collection
    {
        $parentClass = new ReflectionClass(get_parent_class($policyClass));
        $parentMethods = collect($parentClass->getMethods(ReflectionMethod::IS_PUBLIC))
            ->pluck("name");
        $class = new ReflectionClass($policyClass);
        $methods = collect($class->getMethods(ReflectionMethod::IS_PUBLIC))
            ->pluck("name");

        return $methods
            ->diff($parentMethods)
            ->sort();
    }

    protected function getPolicies(): Collection
    {
        $gate = app('Illuminate\Contracts\Auth\Access\Gate');
        $reflectedGate = new ReflectionObject($gate);
        $policies = $reflectedGate->getProperty("policies");
        $policies->setAccessible(true);

        return collect($policies->getValue($gate));
    }
}
