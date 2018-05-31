<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Api;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use Illuminate\Http\Response;
use GeneaLabs\LaravelGovernor\Http\Requests\UserCan as UserAuth;

class UserCan extends Controller
{
    /**
    * @SuppressWarnings(PHPMD.UnusedFormalParameter)
    */
    public function show(UserAuth $request, string $ability) : Response
    {
        return response(null, 204);
    }
}
