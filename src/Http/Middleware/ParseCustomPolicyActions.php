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
        $this->registerCustomPolicyActions();

        return $next($request);
    }

    protected function registerCustomPolicyActions(): void
    {
        $this
            ->getPolicies()
            ->map(function (string $policyClass, string $modelClass): Collection {
                if (! is_subclass_of($policyClass, BasePolicy::class)) {
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
                            $permissionClass = config("genealabs-laravel-governor.models.permission");
                            $permissions = (new $permissionClass)
                                ->with("role", "team")
                                ->toBase()
                                ->get();
                            app()->instance("governor-permissions", $permissions);
                        }

                        $permission = app("governor-permissions")
                            ->where("role_name", "SuperAdmin")
                            ->where("entity_name", $action->entity)
                            ->where("action_name", $action->name)
                            ->where("ownership_name", "any")
                            ->first();

                        if (! $permission) {
                            $permissionClass = config("genealabs-laravel-governor.models.permission");
                            (new $permissionClass)->create([
                                "role_name" => "SuperAdmin",
                                "entity_name" => $action->entity,
                                "action_name" => $action->name,
                                "ownership_name" => "any",
                            ]);
                            $permissionClass = config("genealabs-laravel-governor.models.permission");
                            $permissions = (new $permissionClass)
                                ->with("role", "team")
                                ->toBase()
                                ->get();
                            app()->instance("governor-permissions", $permissions);
                        }

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
