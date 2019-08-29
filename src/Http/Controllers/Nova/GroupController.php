<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Group;
use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreGroupRequest;
use Illuminate\Database\Eloquent\Collection as IlluminateCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class GroupController extends Controller
{
    protected $groups;

    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
        $this->groups = (new Group)
            ->getCached();
    }

    public function index() : IlluminateCollection
    {
        return (new Group)
            ->getCached();
    }

    public function store(StoreGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show($id) : Group
    {
        return (new Group)
            ->getCached()
            ->find($id);
    }

    public function update(UpdateGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy($id) : Response
    {
        (new $groupClass)
            ->destroy($id);

        return response(null, 204);
    }
}
