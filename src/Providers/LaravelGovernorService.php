<?php namespace GeneaLabs\LaravelGovernor\Providers;

use GeneaLabs\LaravelGovernor\Console\Commands\Publish;
use GeneaLabs\LaravelCasts\Providers\Service as LaravelCastsService;
use GeneaLabs\LaravelGovernor\Listeners\CreatedListener;
use GeneaLabs\LaravelGovernor\Listeners\CreatingListener;
use GeneaLabs\LaravelGovernor\Http\ViewComposers\Layout;
use GeneaLabs\LaravelGovernor\Action;
use GeneaLabs\LaravelGovernor\Assignment;
use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Ownership;
use GeneaLabs\LaravelGovernor\Permission;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Support\AggregateServiceProvider;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;

class LaravelGovernorService extends AggregateServiceProvider
{
    protected $defer = false;
    protected $policies = [
        'GeneaLabs\LaravelGovernor\Action' => 'GeneaLabs\LaravelGovernor\Policies\ActionPolicy',
        'GeneaLabs\LaravelGovernor\Assignment' => 'GeneaLabs\LaravelGovernor\Policies\AssignmentPolicy',
        'GeneaLabs\LaravelGovernor\Entity' => 'GeneaLabs\LaravelGovernor\Policies\EntityPolicy',
        'GeneaLabs\LaravelGovernor\Ownership' => 'GeneaLabs\LaravelGovernor\Policies\OwnershipPolicy',
        'GeneaLabs\LaravelGovernor\Permission' => 'GeneaLabs\LaravelGovernor\Policies\PermissionPolicy',
        'GeneaLabs\LaravelGovernor\Role' => 'GeneaLabs\LaravelGovernor\Policies\RolePolicy',
    ];
    protected $providers = [
        LaravelCastsService::class,
    ];

    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        if (! $this->app->routesAreCached()) {
            require __DIR__ . '/../../routes/web.php';
        }

        app('events')->listen('eloquent.creating: *', CreatingListener::class);
        app('events')->listen('eloquent.created: *', CreatedListener::class);

        $this->publishes([
            __DIR__ . '/../../config/config.php' => config_path('genealabs-laravel-governor.php')
        ], 'config');
        $this->publishes([
            __DIR__ . '/../../public' => public_path('genealabs-laravel-governor')
        ], 'assets');
        $this->publishes([
            __DIR__ . '/../../resources/views' => base_path('resources/views/vendor/genealabs/laravel-governor')
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

    public function registerPolicies(GateContract $gate)
    {
        foreach ($this->policies as $key => $value) {
            $gate->policy($key, $value);
        }
    }

    public function provides() : array
    {
        return ['genealabs-laravel-governor'];
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
