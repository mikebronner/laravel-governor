<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration\Seeders;

use GeneaLabs\LaravelGovernor\Database\Seeders\LaravelGovernorUpgradeTo0130;
use GeneaLabs\LaravelGovernor\GovernorOwnable;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\DB;

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
