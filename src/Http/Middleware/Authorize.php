<?php namespace GeneaLabs\LaravelGovernor\Http\Middleware;

use GeneaLabs\LaravelGovernor\Nova\Tools\Governor;

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
        return resolve(Governor::class)
            ->authorize($request)
                ? $next($request)
                : abort(403);
    }
}
