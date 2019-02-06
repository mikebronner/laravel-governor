<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Response;
use GeneaLabs\LaravelGovernor\Http\Requests\StoreRoleRequest;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
    }

    public function index() : Collection
    {
        $roleClass = config("laravel-governor.models.role");

        return (new $roleClass)
            ->with("permissions", "users")
            ->get();
    }

    public function store(StoreRoleRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show(Role $role) : Role
    {
        $role->load("permissions.entity");

        return $role;
    }

    public function update(UpdateRoleRequest $request, Role $role) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy(Role $role) : Response
    {
        $role->delete();

        return response(null, 204);
    }
}
