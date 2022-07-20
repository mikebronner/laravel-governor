<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Http\Middleware;

use Closure;
use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Policies\BasePolicy;
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
        $this->registerCustomPolicyActions();

        return $next($request);
    }

    protected function registerCustomPolicyActions(): void
    {
        $this
            ->getPolicies()
            ->map(function (string $policyClass, string $modelClass): Collection {
                if (! collect(class_parents($policyClass))->contains(BasePolicy::class)) {
                    return collect();
                }

                return $this->getCustomActionMethods($policyClass)
                    ->map(function (string $method) use ($modelClass): Action {
                        $action = app("governor-actions")
                            ->where("name", "{$modelClass}:{$method}")
                            ->first();

                        if (! $action) {
                            $actionClass = app(config('genealabs-laravel-governor.models.action'));
                            $action = (new $actionClass)
                                ->firstOrCreate([
                                    "name" => "{$modelClass}:{$method}",
                                ]);
                        }

                        return $action;
                    });
            })
            ->filter()
            ->toArray();
    }

    protected function getCustomActionMethods(string $policyClass): Collection
    {
        return cache()->remember("genealabs:laravel-governor:custom-action-methods", 300, function () use ($policyClass): Collection {
            $parentClass = new ReflectionClass(get_parent_class($policyClass));
            $parentMethods = collect($parentClass->getMethods(ReflectionMethod::IS_PUBLIC))
                ->pluck("name");
            $class = new ReflectionClass($policyClass);
            $methods = collect($class->getMethods(ReflectionMethod::IS_PUBLIC))
                ->pluck("name");

            return $methods
                ->diff($parentMethods)
                ->sort();
        });
    }

    protected function getPolicies(): Collection
    {
        return cache()->remember("genealabs:laravel-governor:policies", 300, function (): Collection {
            $gate = app('Illuminate\Contracts\Auth\Access\Gate');
            $reflectedGate = new ReflectionObject($gate);
            $policies = $reflectedGate->getProperty("policies");
            $policies->setAccessible(true);

            return collect($policies->getValue($gate));
        });
    }
}
