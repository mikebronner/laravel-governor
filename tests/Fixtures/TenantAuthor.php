<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Tests\Fixtures;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;

/**
 * A governed model bound to a non-default ("tenant") database connection, used
 * to prove the upgrade seeder writes ownership rows to the model's own
 * connection rather than the default one.
 */
class TenantAuthor extends Model
{
    use Governable;

    protected $connection = 'governor_tenant';
    protected $table = 'tenant_authors';
    protected $guarded = [];
}
