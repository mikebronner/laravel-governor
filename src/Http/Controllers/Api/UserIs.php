<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Api;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Http\Response;
use GeneaLabs\LaravelGovernor\Http\Requests\UserIs as UserIsRole;

class UserIs extends Controller
{
    /**
    * @SuppressWarnings(PHPMD.UnusedFormalParameter)
    */
    public function show(UserIsRole $request, string $ability) : Response
    {
        return response(null, 204);
    }
}
