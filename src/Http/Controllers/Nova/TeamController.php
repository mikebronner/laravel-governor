<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers\Nova;

use GeneaLabs\LaravelGovernor\Http\Controllers\Controller;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateTeamRequest;
use Illuminate\Http\Response;

class TeamController extends Controller
{
    public function __construct()
    {
        $this->middleware([]);
        // $this->middleware(["nova"]);
    }

    public function update(UpdateTeamRequest $request) : Response
    {
        $request->process();

        return response(null, 204);
    }
}
