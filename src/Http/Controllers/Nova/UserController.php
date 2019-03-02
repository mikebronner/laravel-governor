<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    public function __construct()
    {
        // prevent default construct
    }

    public function index() : Collection
    {
        $userClass = config('genealabs-laravel-governor.models.auth');
        return (new $userClass)
            ->get();
    }
}
