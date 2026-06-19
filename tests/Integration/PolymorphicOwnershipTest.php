<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Integration;

use GeneaLabs\LaravelGovernor\GovernorOwnable;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\Author;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\SoftDeletableAuthor;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\TenantAuthor;
use GeneaLabs\LaravelGovernor\Tests\Fixtures\User;
use GeneaLabs\LaravelGovernor\Tests\UnitTestCase;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PolymorphicOwnershipTest extends UnitTestCase
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

    // --- GovernorOwnable model tests ---

    public function testGovernorOwnableIsCreatedWhenGovernableModelIsCreated()
    {
        $author = Author::factory()->create();

        $ownable = GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->first();

        $this->assertNotNull($ownable);
        $this->assertEquals($this->user->id, $ownable->user_id);
    }

    public function testGovernorOwnableOwnableRelationship()
    {
        $author = Author::factory()->create();

        $ownable = GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->first();

        $this->assertInstanceOf(Author::class, $ownable->ownable);
        $this->assertEquals($author->id, $ownable->ownable->id);
    }

    public function testGovernorOwnableOwnerRelationship()
    {
        $author = Author::factory()->create();

        $ownable = GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->first();

        $this->assertInstanceOf(User::class, $ownable->owner);
        $this->assertEquals($this->user->id, $ownable->owner->id);
    }

    public function testGovernorOwnableTableName()
    {
        $ownable = new GovernorOwnable();

        $this->assertEquals('governor_ownables', $ownable->getTable());
    }

    public function testGovernorOwnableFillableAttributes()
    {
        $ownable = new GovernorOwnable();

        $this->assertEquals(['ownable_type', 'ownable_id', 'user_id'], $ownable->getFillable());
    }

    // --- governorOwner() MorphOne relationship tests ---

    public function testGovernorOwnerRelationshipReturnsOwnable()
    {
        $author = Author::factory()->create();

        $ownable = $author->governorOwner;

        $this->assertInstanceOf(GovernorOwnable::class, $ownable);
        $this->assertEquals($this->user->id, $ownable->user_id);
        $this->assertEquals(Author::class, $ownable->ownable_type);
        $this->assertEquals($author->getKey(), $ownable->ownable_id);
    }

    public function testOwnershipWriteAndReadUseMorphAliasUnderMorphMap()
    {
        // The MorphOne reads governor_ownables.ownable_type via getMorphClass(),
        // which returns the alias once a morph map is registered. The write path
        // must store that same alias, or the relationship silently resolves to
        // null and every policy check downgrades the owner to 'other'.
        Relation::morphMap(['author' => Author::class]);

        $author = Author::factory()->create();

        // Stored as the morph alias, not the raw FQCN.
        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => 'author',
            'ownable_id' => $author->getKey(),
            'user_id' => $this->user->id,
        ]);
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);

        // And the relationship still resolves to the owner.
        $author->unsetRelation('governorOwner');
        $this->assertNotNull($author->governorOwner);
        $this->assertEquals($this->user->id, $author->governorOwner->user_id);
        $this->assertEquals($this->user->id, $author->governor_owned_by);
    }

    public function testGovernorOwnerRelationshipReturnsNullWhenNoOwner()
    {
        $author = Author::factory()->create();

        // Remove the ownership record
        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();

        $author->unsetRelation('governorOwner');

        $this->assertNull($author->governorOwner);
    }

    public function testGovernorOwnerCanBeEagerLoaded()
    {
        $author1 = Author::factory()->create();
        $author2 = Author::factory()->create();

        $authors = Author::with('governorOwner')
            ->whereIn('id', [$author1->id, $author2->id])
            ->get();

        // Verify eager loading populated the relation without additional queries
        foreach ($authors as $author) {
            $this->assertTrue($author->relationLoaded('governorOwner'));
            $this->assertInstanceOf(GovernorOwnable::class, $author->governorOwner);
            $this->assertEquals($this->user->id, $author->governorOwner->user_id);
        }
    }

    // --- Attach/detach via polymorphic relationship ---

    public function testAttachOwnershipViaPolymorphicRelationship()
    {
        $author = Author::factory()->create();

        // Remove auto-created ownership
        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $author->unsetRelation('governorOwner');

        // Manually attach via the relationship
        $otherUser = User::factory()->create();
        $author->governorOwner()->create([
            'user_id' => $otherUser->id,
        ]);

        $author->unsetRelation('governorOwner');
        $this->assertNotNull($author->governorOwner);
        $this->assertEquals($otherUser->id, $author->governorOwner->user_id);
    }

    public function testDetachOwnershipViaPolymorphicRelationship()
    {
        $author = Author::factory()->create();

        $this->assertNotNull($author->governorOwner);

        // Detach by deleting the relationship
        $author->governorOwner()->delete();
        $author->unsetRelation('governorOwner');

        $this->assertNull($author->governorOwner);
    }

    // --- getGovernorOwnedByAttribute accessor tests ---

    public function testGetGovernorOwnedByAttributeReturnsUserIdFromPolymorphicTable()
    {
        $author = Author::factory()->create();

        $this->assertEquals($this->user->id, $author->governor_owned_by);
    }

    public function testGetGovernorOwnedByAttributeReturnsNullWhenNoOwnership()
    {
        $author = Author::factory()->create();

        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $author->unsetRelation('governorOwner');

        // Clear the column attribute too so we test the full fallback path
        $author->setRawAttributes(
            array_diff_key($author->getAttributes(), ['governor_owned_by' => true])
        );

        $this->assertNull($author->governor_owned_by);
    }

    public function testGetGovernorOwnedByAttributeFallsBackToColumnValue()
    {
        $author = Author::factory()->create();

        // Remove the polymorphic record so the accessor falls back to column
        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $author->unsetRelation('governorOwner');

        // The raw attribute should still hold the value from CreatingListener
        $this->assertEquals($this->user->id, $author->governor_owned_by);
    }

    // --- getOwnedByAttribute (deprecated) accessor tests ---

    public function testGetOwnedByAttributeReturnsOwnerModel()
    {
        $author = Author::factory()->create();

        $owner = $author->ownedBy;

        $this->assertInstanceOf(User::class, $owner);
        $this->assertEquals($this->user->id, $owner->id);
    }

    public function testGetOwnedByAttributeReturnsNullWhenNoOwnership()
    {
        $author = Author::factory()->create();

        GovernorOwnable::where('ownable_type', Author::class)
            ->where('ownable_id', $author->getKey())
            ->delete();
        $author->unsetRelation('governorOwner');

        $this->assertNull($author->ownedBy);
    }

    // --- Eager loading works after removing unsetRelation ---

    public function testEagerLoadedGovernorOwnerIsNotDiscardedOnAccessorAccess()
    {
        Author::factory()->count(3)->create();

        $authors = Author::with('governorOwner')->get();

        // Accessing governor_owned_by should use the already-loaded relation,
        // not discard it (which was the N+1 bug).
        foreach ($authors as $author) {
            $this->assertTrue($author->relationLoaded('governorOwner'));
            $ownedBy = $author->governor_owned_by;
            $this->assertEquals($this->user->id, $ownedBy);
            // Relation should still be loaded after accessor access
            $this->assertTrue($author->relationLoaded('governorOwner'));
        }
    }

    // --- Non-default connection (multi-tenancy) ---

    public function testOwnershipForGovernedModelOnNonDefaultConnectionResolvesThroughCreateEvent()
    {
        // A Governable model on a non-default ("tenant") connection, created
        // through the normal model-create event, must have its ownership row
        // written to — and read from — that same connection. governorOwner()
        // resolves GovernorOwnable on the parent model's connection, so a
        // default-connection write would be invisible and BasePolicy would
        // silently downgrade the real owner to 'other'.
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

        // Create through the model so the eloquent.created event fires and
        // CreatedListener writes the ownership row.
        $tenantAuthor = TenantAuthor::create([]);

        // The ownership row lands on the tenant connection...
        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => TenantAuthor::class,
            'ownable_id' => $tenantAuthor->getKey(),
            'user_id' => $this->user->id,
        ], 'governor_tenant');

        // ...and NOT on the default connection (the bug being guarded against).
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => TenantAuthor::class,
            'ownable_id' => $tenantAuthor->getKey(),
        ], 'testing');

        // And governorOwner() resolves it from the model's own connection.
        $tenantAuthor->unsetRelation('governorOwner');
        $this->assertNotNull($tenantAuthor->governorOwner);
        $this->assertEquals($this->user->id, $tenantAuthor->governorOwner->user_id);
        $this->assertEquals($this->user->id, $tenantAuthor->governor_owned_by);
    }

    // --- Recycled primary key / orphan cleanup ---

    public function testCreateReattributesOwnershipForRecycledPrimaryKey()
    {
        // An orphan ownership row (e.g. left by a delete that bypassed events,
        // or a recycled primary key) must not leak its old owner onto a new
        // record. updateOrCreate re-attributes the row to the current owner.
        $oldOwner = User::factory()->create();
        $this->actingAs($this->user);

        // Simulate a surviving orphan row for a primary key about to be reused.
        DB::table('governor_ownables')->insert([
            'ownable_type' => Author::class,
            'ownable_id' => 999,
            'user_id' => $oldOwner->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create a new Author that reuses primary key 999 while acting as the
        // current user.
        $author = new Author(['name' => 'Recycled']);
        $author->id = 999;
        $author->save();

        // The ownership row is re-attributed to the new owner, not the stale one.
        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => 999,
            'user_id' => $this->user->id,
        ]);
        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => 999,
            'user_id' => $oldOwner->id,
        ]);
    }

    public function testDeletingGovernedModelRemovesOwnershipRecord()
    {
        $author = Author::factory()->create();

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);

        // A hard delete removes the now-orphaned ownership row so a later
        // reused primary key can't inherit a stale owner.
        $author->delete();

        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => Author::class,
            'ownable_id' => $author->getKey(),
        ]);
    }

    public function testSoftDeletePreservesOwnershipRecordUntilForceDelete()
    {
        $author = SoftDeletableAuthor::create(['name' => 'Soft']);

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => SoftDeletableAuthor::class,
            'ownable_id' => $author->getKey(),
        ]);

        // A soft delete keeps the record recoverable, so its ownership row must
        // survive for a later restore.
        $author->delete();

        $this->assertDatabaseHas('governor_ownables', [
            'ownable_type' => SoftDeletableAuthor::class,
            'ownable_id' => $author->getKey(),
        ]);

        // A force delete truly removes the record, so its ownership row goes too.
        $author->forceDelete();

        $this->assertDatabaseMissing('governor_ownables', [
            'ownable_type' => SoftDeletableAuthor::class,
            'ownable_id' => $author->getKey(),
        ]);
    }
}
