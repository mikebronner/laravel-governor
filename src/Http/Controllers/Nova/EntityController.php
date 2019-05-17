<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreRoleRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class EntityController extends Controller
{
    protected $entities;

    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
        $this->entities = config("genealabs-laravel-governor.models.entity");
        $this->entities = new $this->entities;
    }

    public function index() : Collection
    {
        return $this->entities
            ->with("group")
            ->orderBy("name")
            ->get();
    }
}
