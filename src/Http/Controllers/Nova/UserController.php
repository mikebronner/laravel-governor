<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\User;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    public function __construct()
    {
        // prevent default construct
    }

    public function index() : Collection
    {
        $userClass = app(config('genealabs-laravel-governor.models.auth'));

        return (new $userClass)
            ->getCached();
    }
}
