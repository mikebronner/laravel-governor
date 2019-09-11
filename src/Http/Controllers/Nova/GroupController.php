<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Group;
use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreGroupRequest;
use Illuminate\Database\Eloquent\Collection as IlluminateCollection;
use Illuminate\Http\Response;

class GroupController extends Controller
{
    public function index() : IlluminateCollection
    {
        $groupClass = app(config('genealabs-laravel-governor.models.group'));
            
        return (new $groupClass)
            ->with("entities")
            ->orderBy("name")
            ->get();
    }

    public function store(StoreGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show($id) : Group
    {
        $groupClass = app(config('genealabs-laravel-governor.models.group'));
            
        return (new $groupClass)
            ->with("entities")
            ->orderBy("name")
            ->get()
            ->find($id);
    }

    public function update(UpdateGroupRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy($id) : Response
    {
        $groupClass = config("genealabs-laravel-governor.models.group");
        (new $groupClass)
            ->destroy($id);

        return response(null, 204);
    }
}
