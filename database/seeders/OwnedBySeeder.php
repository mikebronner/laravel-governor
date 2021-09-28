<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use GeneaLabs\LaravelGovernor\Traits\EntityManagement;
use GeneaLabs\LaravelGovernor\Traits\GovernorOwnedByField;
use Illuminate\Database\Seeder;

class OwnedBySeeder extends Seeder
{
    use EntityManagement;
    use GovernorOwnedByField;

    public function run()
    {
        $this->getPolicies()
            ->each(function ($policy) {
                $this->createGovernorOwnedByFieldsByPolicy(new $policy);
            });
    }
}
