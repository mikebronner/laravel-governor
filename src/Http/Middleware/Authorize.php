<?php namespace GeneaLabs\LaravelGovernor\Http\Middleware;

use Genealabs\LaravelGovernor\Nova\Tools\LaravelNovaGovernor;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, $next)
    {
        return resolve(LaravelNovaGovernor::class)
            ->authorize($request)
            ? $next($request)
            : abort(403);
    }
}
