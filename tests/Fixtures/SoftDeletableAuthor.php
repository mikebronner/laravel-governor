<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Fixtures;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * A soft-deletable governed model, used to prove the deleting-event cleanup
 * keeps the polymorphic ownership row on a soft delete (the record is still
 * recoverable) and only removes it on a hard/force delete.
 */
class SoftDeletableAuthor extends Model
{
    use Governable;
    use SoftDeletes;

    protected $table = 'soft_deletable_authors';
    protected $guarded = [];
}
