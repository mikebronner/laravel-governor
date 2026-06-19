<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration\Seeders;

use GeneaLabs\LaravelGovernor\Database\Seeders\LaravelGovernorUpgradeTo0130;
use GeneaLabs\LaravelGovernor\GovernorOwnable;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\TenantAuthor;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UpgradeTo0130SeederTest extends UnitTestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    protected function tearDown(): void
    {
        // Reset any morph map a test registered so it can't leak into the rest
        // of the suite.
        Relation::morphMap([], false);
        Relation::requireMorphMap(false);

        parent::tearDown();
    }

    public function testSeederRunLeavesFixtureModelsUntouchedBecauseTheyAreOutsideAppPath()
    {
        // Create an author (auto-creates polymorphic record).
        $author = Author::factory()->create();

        // Delete the auto-created polymorphic record to simulate pre-upgrade state.
        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);

        // Ensure the old column still has the value.
        $this->assertEquals(
            $this->user->id,
            DB::table('authors')->where('id', $author->id)->value('governor_owned_by')
        );

        // run() discovers governable models under app_path(), which holds no
        // test fixtures, so it completes without recreating the fixture's
        // polymorphic record. The per-model migration itself is covered by the
        // migrateModel() tests below.
        (new LaravelGovernorUpgradeTo0130())->run();

        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);
    }

    public function testSeederDoesNotDuplicateExistingPolymorphicRecords()
    {
        $author = Author::factory()->create();

        // Record already exists from auto-creation
        $countBefore = GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->count();

        $this->assertEquals(1, $countBefore);

        // insertOrIgnore means running the seeder again shouldn't duplicate
        // (tested indirectly since the seeder won't find test fixtures in app_path,
        // but the underlying insertOrIgnore logic is verified here)
        DB::table('governor_ownables')->insertOrIgnore([
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
            'user_id' => $this->user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $countAfter = GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->count();

        $this->assertEquals(1, $countAfter);
    }

    public function testSeederRunsWithoutErrorOnEmptyModelSet()
    {
        // The seeder scans app_path() which in the test environment has no
        // governable models; run() must complete without throwing.
        $this->expectNotToPerformAssertions();

        (new LaravelGovernorUpgradeTo0130())->run();
    }

    public function testMigrateModelRecreatesPolymorphicRecordsFromDeprecatedColumn()
    {
        $author = Author::factory()->create();

        // Simulate pre-upgrade state: the deprecated column still holds the
        // owner, but no polymorphic record exists yet.
        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);

        (new LaravelGovernorUpgradeTo0130())->migrateModel(Author::class);

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
            'user_id' => $this->user->id,
        ]);
    }

    public function testMigrateModelIsIdempotent()
    {
        $author = Author::factory()->create();

        // A record already exists from auto-creation; running the migration
        // again must not duplicate it (insertOrIgnore + unique constraint).
        (new LaravelGovernorUpgradeTo0130())->migrateModel(Author::class);

        $this->assertEquals(
            1,
            GovernorOwnable::where('ownable_type', Author::class)
                ->where('ownable_id', $author->getKey())
                ->count()
        );
    }

    public function testMigrateModelRecreatesOwnershipAcrossManyRecords()
    {
        $authors = Author::factory()->count(5)->create();

        // Clear all polymorphic records to simulate the pre-upgrade state,
        // then exercise the chunked migration path.
        GovernorOwnable::where('ownable_type', Author::class)->delete();
        $this->assertEquals(
            0,
            GovernorOwnable::where('ownable_type', Author::class)->count()
        );

        (new LaravelGovernorUpgradeTo0130())->migrateModel(Author::class);

        $this->assertEquals(
            $authors->count(),
            GovernorOwnable::where('ownable_type', Author::class)->count()
        );
    }

    public function testMigrateModelWritesOwnershipToTheModelsOwnConnection()
    {
        // A governed model on a non-default ("tenant") connection must have its
        // ownership rows written to that same connection — not the default one.
        // Both the governed table and the governor_ownables table live on the
        // tenant database, mirroring the per-tenant setup the new table's
        // migration supports under Hyn\Tenancy.
        config()->set('database.connections.governor_tenant', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
            'foreign_key_constraints' => true,
        ]);

        $tenantSchema = Schema::connection('governor_tenant');
        $tenantSchema->create('tenant_authors', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('governor_owned_by')->nullable();
            $table->timestamps();
        });
        $tenantSchema->create('governor_ownables', function (Blueprint $table): void {
            $table->id();
            $table->string('ownable_type');
            $table->unsignedBigInteger('ownable_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->unique(['ownable_type', 'ownable_id']);
        });

        // Pre-upgrade state: the deprecated column holds the owner, no
        // polymorphic row exists yet. Insert directly to skip model events so
        // the ownership row isn't auto-created.
        DB::connection('governor_tenant')->table('tenant_authors')->insert([
            'id' => 1,
            'governor_owned_by' => $this->user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        (new LaravelGovernorUpgradeTo0130())->migrateModel(TenantAuthor::class);

        // The ownership row lands on the tenant connection...
        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => TenantAuthor::class,
            'ownable_id' => 1,
            'user_id' => $this->user->id,
        ], 'governor_tenant');

        // ...and NOT on the default connection (the bug being guarded against).
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => TenantAuthor::class,
            'ownable_id' => 1,
        ], 'testing');
    }

    public function testRunDiscoversAndMigratesGovernableModelsUnderAppPath()
    {
        // Exercise the real run() -> getModels() discovery orchestration: a
        // governable model placed under app_path() with a pre-upgrade row must
        // be found and migrated. The other seeder tests can't cover this because
        // their fixtures live outside app_path(), so run() is a no-op for them.
        $tempAppPath = sys_get_temp_dir() . '/governor-app-' . uniqid();
        mkdir($tempAppPath, 0777, true);

        $modelFile = $tempAppPath . '/DiscoveredGoverned.php';
        file_put_contents($modelFile, <<<'PHP'
<?php

namespace App;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;

class DiscoveredGoverned extends Model
{
    use Governable;

    protected $table = 'discovered_governed';
    protected $guarded = [];
}
PHP);
        // Load the class so class_exists() resolves it during discovery, and
        // point app_path() at the temp directory so allFiles() finds the file.
        require_once $modelFile;
        $this->app->useAppPath($tempAppPath);

        // The testbench harness has no host-app composer.json PSR-4 mapping, so
        // Application::getNamespace() (used by getModels()) can't auto-detect the
        // app namespace from disk. Pin it to App\ so discovery resolves the file
        // above to \App\DiscoveredGoverned — the rest of the discovery path
        // (file scan, reflection filtering, migrateModel) runs for real.
        $namespaceProperty = new \ReflectionProperty($this->app, 'namespace');
        $namespaceProperty->setAccessible(true);
        $namespaceProperty->setValue($this->app, 'App\\');

        Schema::create('discovered_governed', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('governor_owned_by')->nullable();
            $table->timestamps();
        });
        DB::table('discovered_governed')->insert([
            'id' => 1,
            'governor_owned_by' => $this->user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        (new LaravelGovernorUpgradeTo0130())->run();

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => \App\DiscoveredGoverned::class,
            'ownable_id' => 1,
            'user_id' => $this->user->id,
        ]);

        Schema::dropIfExists('discovered_governed');
        @unlink($modelFile);
        @rmdir($tempAppPath);
    }

    public function testMigrateModelWritesMorphAliasUnderMorphMap()
    {
        // Under a morph map, migrateModel() must store the alias getMorphClass()
        // returns, not the raw FQCN — otherwise the migrated rows are orphaned
        // and governorOwner() resolves to null.
        Relation::morphMap(['author' => Author::class]);

        $author = Author::factory()->create();

        GovernorOwnable::where('ownable_type', 'author')
            ->where('ownable_id', $author->getKey())
            ->delete();

        (new LaravelGovernorUpgradeTo0130())->migrateModel(Author::class);

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => 'author',
            'ownable_id' => $author->getKey(),
            'user_id' => $this->user->id,
        ]);

        $author->unsetRelation('governorOwner');
        $this->assertNotNull($author->governorOwner);
        $this->assertEquals($this->user->id, $author->governorOwner->user_id);
    }
}
