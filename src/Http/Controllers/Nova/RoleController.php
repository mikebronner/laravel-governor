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
        $roleClass = config("genealabs-laravel-governor.models.role");

        return (new $roleClass)
            ->with("permissions", "users")
            ->get();
    }

    public function store(StoreRoleRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function show($id) : Role
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        $role = (new $roleClass)
            ->find($id);
        $role->load("permissions.entity");

        return $role;
    }

    public function update(UpdateRoleRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }

    public function destroy($id) : Response
    {
        $roleClass = config("genealabs-laravel-governor.models.role");
        $role = (new $roleClass)
            ->find($id);
        $role->delete();

        return response(null, 204);
    }
}
