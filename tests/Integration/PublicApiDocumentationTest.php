<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration;

use GeneaLabs\LaravelGovernor\GovernorCache;
use GeneaLabs\LaravelGovernor\Policies\BasePolicy;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use GeneaLabs\LaravelGovernor\Traits\EntityManagement;
use GeneaLabs\LaravelGovernor\Traits\Governable;
use GeneaLabs\LaravelGovernor\Traits\Governing;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;

/**
 * Guards the README against drifting away from the code. This is the test
 * backing AC #4 ("docs kept in sync"), so it actually reads README.md and
 * enumerates the public API by reflection — a public member that exists in
 * code but is missing from the docs (or a cached lookup table the docs claim
 * but the code does not implement) makes this test fail. It also exercises the
 * documented HTTP response contract of the authorization API end to end.
 */
class PublicApiDocumentationTest extends UnitTestCase
{
    protected string $readme;

    public function setUp(): void
    {
        parent::setUp();

        $this->readme = (string) file_get_contents(__DIR__ . '/../../README.md');

        // The authorization API routes are protected by `auth:api`; define the
        // guard for the test app so the documented HTTP contract can be driven
        // through the real middleware/request pipeline.
        config()->set('auth.guards.api', [
            'driver' => 'session',
            'provider' => 'users',
        ]);
        config()->set('auth.providers.users.model', User::class);

        // The package's API route group uses the `bindings` route-middleware
        // alias (SubstituteBindings); register it for Testbench's bare app.
        $this->app['router']->aliasMiddleware('bindings', SubstituteBindings::class);
    }

    // -- Documentation coverage (reflection-driven) -------------------------

    public function testReadmeDocumentsEveryPublicTraitAndPolicyMember(): void
    {
        $sources = [
            Governing::class,
            Governable::class,
            EntityManagement::class,
            BasePolicy::class,
        ];

        $asserted = false;

        foreach ($sources as $source) {
            foreach ($this->documentedApiTokens($source) as $token) {
                $asserted = true;
                $this->assertStringContainsString(
                    $token,
                    $this->readme,
                    "Public API member `{$token}` (from {$source}) is not documented in the README.",
                );
            }
        }

        $this->assertTrue($asserted, 'Expected to enumerate at least one public API member.');
    }

    public function testReadmeDocumentsEveryArtisanCommand(): void
    {
        $commands = array_filter(
            array_keys(Artisan::all()),
            static fn (string $name): bool => str_starts_with($name, 'governor:'),
        );

        $this->assertNotEmpty($commands, 'Expected Governor artisan commands to be registered.');

        foreach ($commands as $command) {
            $this->assertStringContainsString(
                $command,
                $this->readme,
                "Artisan command `{$command}` is not documented in the README.",
            );
        }
    }

    public function testReadmeDocumentsEveryConfigKey(): void
    {
        $config = config('genealabs-laravel-governor');

        $this->assertIsArray($config);

        foreach (array_keys($config) as $key) {
            $this->assertStringContainsString(
                (string) $key,
                $this->readme,
                "Config key `{$key}` is not documented in the README.",
            );
        }
    }

    public function testReadmeDocumentsModelLifecycleEvents(): void
    {
        // Mirrors the `eloquent.*` hooks wired up in Providers\Service::boot().
        $events = [
            'eloquent.creating',
            'eloquent.created',
            'eloquent.saving',
        ];

        foreach ($events as $event) {
            $this->assertStringContainsString(
                $event,
                $this->readme,
                "Model lifecycle event `{$event}` is not documented in the README.",
            );
        }
    }

    public function testReadmeCacheKeysMatchGovernorCache(): void
    {
        $keys = (new ReflectionClass(GovernorCache::class))->getConstant('KEYS');

        $this->assertIsArray($keys);

        foreach ($keys as $key) {
            $this->assertStringContainsString(
                $key,
                $this->readme,
                "Cached lookup table `{$key}` is not documented in the README.",
            );
        }

        // Ownership is only observed for invalidation, never cached, so the
        // README must not list it among the cached lookup tables.
        $this->assertStringNotContainsString(
            'ownerships, permissions',
            $this->readme,
            'README still lists "ownerships" as a cached lookup table; GovernorCache::KEYS does not cache ownerships.',
        );
    }

    // -- Documented behavior is real ----------------------------------------

    public function testDocumentedTraitMembersAreBehaviorallyValid(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->assertTrue($user->hasRole('Member'));
        $this->assertInstanceOf(BelongsToMany::class, $user->roles());
        $this->assertInstanceOf(BelongsToMany::class, $user->teams());
        $this->assertInstanceOf(HasMany::class, $user->ownedTeams());
        $this->assertInstanceOf(Collection::class, $user->permissions);
        $this->assertInstanceOf(Collection::class, $user->effective_permissions);

        $author = new Author();
        $this->assertInstanceOf(BelongsTo::class, $author->ownedBy());
        $this->assertInstanceOf(MorphToMany::class, $author->teams());
        $this->assertInstanceOf(Builder::class, Author::viewable());
    }

    // -- Documented HTTP response contract ----------------------------------

    public function testUserCanApiReturnsDocumented204WhenAuthorized(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->roles()->attach('SuperAdmin');
        $this->actingAs($superAdmin, 'api');

        $response = $this->json(
            'GET',
            route('genealabs.laravel-governor.api.user-can.show', 'create'),
            ['model' => Author::class],
        );

        $response->assertNoContent(204);
    }

    public function testUserCanApiReturnsDocumented403WhenNotAuthorized(): void
    {
        // A fresh user has only the baseline "Member" role and no permission to
        // create the Author entity, so authorization fails.
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->json(
            'GET',
            route('genealabs.laravel-governor.api.user-can.show', 'create'),
            ['model' => Author::class],
        );

        $response->assertForbidden();
    }

    public function testUserIsApiReturnsDocumented204WhenUserHasRole(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->roles()->attach('SuperAdmin');
        $this->actingAs($superAdmin, 'api');

        $response = $this->json(
            'GET',
            route('genealabs.laravel-governor.api.user-is.show', 'SuperAdmin'),
        );

        $response->assertNoContent(204);
    }

    public function testUserIsApiReturnsDocumented403WhenUserLacksRole(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->json(
            'GET',
            route('genealabs.laravel-governor.api.user-is.show', 'SuperAdmin'),
        );

        $response->assertForbidden();
    }

    /**
     * The public members a consumer may call on a trait/policy, normalized to
     * the token the README documents them under (scopes drop the `scope`
     * prefix, Eloquent accessors are documented as their snake_case attribute).
     *
     * @param  class-string  $class
     * @return array<int, string>
     */
    protected function documentedApiTokens(string $class): array
    {
        $reflection = new ReflectionClass($class);
        $tokens = [];

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            if ($method->isConstructor() || $method->isDestructor()) {
                continue;
            }

            $name = $method->getName();

            if (preg_match('/^get(.+)Attribute$/', $name, $matches) === 1) {
                $tokens[] = Str::snake($matches[1]);

                continue;
            }

            if (str_starts_with($name, 'scope') && strlen($name) > strlen('scope')) {
                $tokens[] = lcfirst(substr($name, strlen('scope')));

                continue;
            }

            $tokens[] = $name;
        }

        return array_values(array_unique($tokens));
    }
}
