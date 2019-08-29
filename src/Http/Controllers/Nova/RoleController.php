<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreRoleRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
    }

    public function index() : Collection
    {
        return (new Role)
            ->getCached();
    }

    public function store(StoreRoleRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show($id) : Role
    {
        $role = (new Role)
            ->getCached()
            ->find($id);

        return $role;
    }

    public function update(UpdateRoleRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy($id) : Response
    {
        (new Role)
            ->getCached()
            ->find($id)
            ->delete();

        return response(null, 204);
    }
}
