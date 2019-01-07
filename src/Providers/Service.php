<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelCasts\Providers\Service as LaravelCastsService;
use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Assignment;
use GeneaLabs\LaravelGovernor\Console\Commands\Publish;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\ViewComposers\Layout;
use GeneaLabs\LaravelGovernor\Listeners\CreatedListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatingListener;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Support\AggregateServiceProvider;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;

class Service extends AggregateServiceProvider
{
    protected $defer = false;
    protected $providers = [
        LaravelCastsService::class,
    ];

    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function boot(GateContract $gate)
    {
        app('events')->listen('eloquent.creating: *', CreatingListener::class);
        app('events')->listen('eloquent.created: *', CreatedListener::class);

        $this->publishes([
            __DIR__ . '/../../config/config.php' => config_path('genealabs-laravel-governor.php')
        ], 'config');
        $this->publishes([
            __DIR__ . '/../../public' => public_path('genealabs-laravel-governor')
        ], 'assets');
        $this->publishes([
            __DIR__ . '/../../resources/views' => base_path('resources/views/vendor/genealabs-laravel-governor')
        ], 'views');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'genealabs-laravel-governor');
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');

        if (Schema::hasTable('entities')) {
            $this->parsePolicies($gate);
        }
    }

    public function register()
    {
        parent::register();

        $this->mergeConfigFrom(__DIR__ . '/../../config/config.php', 'genealabs-laravel-governor');
        $this->commands(Publish::class);
    }

    public function provides() : array
    {
        return [];
    }

    protected function parsePolicies(GateContract $gate)
    {
        $reflection = new ReflectionClass($gate);
        $property = $reflection->getProperty('policies');
        $property->setAccessible(true);
        collect($property->getValue($gate))
            ->transform(function ($policyClass) {
                return $this->newEntity($policyClass);
            })
            ->values()
            ->filter()
            ->each(function ($entity) {
                (new Entity)->firstOrCreate(['name' => $entity]);
                $superadmin = (new Role)->whereName('SuperAdmin')->first();
                $ownership = (new Ownership)->whereName('any')->first();
                (new Action)->all()->each(function ($action) use ($entity, $superadmin, $ownership) {
                    $permission = new Permission();
                    $permission->role()->associate($superadmin);
                    $permission->action()->associate($action);
                    $permission->ownership()->associate($ownership);
                    $permission->entity()->associate($entity);
                    $permission->save();
                });
            });
        (new Entity)
            ->with("permissions")
            ->whereDoesntHave("permissions", function ($query) {
                $query->where("role_key", "SuperAdmin");
            })
            ->get()
            ->each(function ($entity) {
                (new Action)->all()->each(function ($action) use ($entity) {
                    (new Permission)->firstOrCreate([
                        "role_key" => "SuperAdmin",
                        "action_key" => $action->name,
                        "ownership_key" => "any",
                        "entity_key" => $entity->name,
                    ]);
                });
            });
    }

    protected function newEntity(string $policyClass)
    {
        $policyClass = collect(explode('\\', $policyClass))->last();
        $entity = str_replace('policy', '', strtolower($policyClass));

        if (in_array($entity, ['assignment', 'entity', 'permission', 'role', 'action', 'ownership'])) {
            return;
        }

        if (! app('db')->table('entities')->where('name', $entity)->exists()) {
            return $entity;
        }
    }
}
