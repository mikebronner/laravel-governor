<?php

namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Traits\Governing;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Governing;
}
