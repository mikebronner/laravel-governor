<?php

namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Traits\Governing;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Governing;

    // public function __construct()
    // {
    //     if (! $this->with
    //         || ! is_array($this->with)
    //     ) {
    //         $this->with = [];
    //     }

    //     $this->with[] = "roles";
    //     $this->with[] = "teams";
    // }

    public function getCached() : Collection
    {
        return app("cache")->remember("governor-users", 300, function () {
            $userClass = app(config('genealabs-laravel-governor.models.auth'));
            
            return (new $userClass)
                ->get();
        });
    }
}
