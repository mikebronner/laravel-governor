<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Traits\Governing;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Governing;
}
