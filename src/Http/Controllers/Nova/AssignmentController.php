<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Http\Response;

class AssignmentController extends Controller
{
    public function update(string $role) : Response
    {
        $roleClass = config("laravel-governor.models.role");

        $role = (new $roleClass)
            ->find($role);
        $role->users()->sync(request("user_ids"));

        return response(null, 204);
    }
}
