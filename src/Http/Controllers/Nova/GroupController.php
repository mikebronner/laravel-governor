<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreGroupRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class GroupController extends Controller
{
    protected $groups;

    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
        $this->groups = config("genealabs-laravel-governor.models.group");
        $this->groups = new $this->groups;
    }

    public function index() : Collection
    {
        return $this->groups
            ->with("entities")
            ->orderBy("name")
            ->get();
    }

    public function store(StoreGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show($id) : Role
    {
        return $this->groups
            ->with("entities")
            ->find($id);
    }

    public function update(UpdateGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy($id) : Response
    {
        $this->groups
            ->find($id)
            ->delete();

        return response(null, 204);
    }
}
