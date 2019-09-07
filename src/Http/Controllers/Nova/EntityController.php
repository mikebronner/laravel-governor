<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Support\Collection;

class EntityController extends Controller
{
    public function index() : Collection
    {
        return (new Entity)
            ->getCached();
    }
}
