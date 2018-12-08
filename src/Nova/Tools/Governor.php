<?php namespace GeneaLabs\LaravelGovernor\Nova\Tools;

use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class Governor extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('genealabs-laravel-governor', __DIR__.'/../../../dist/js/tool.js');
        Nova::style('genealabs-laravel-governor', __DIR__ . '/../../../dist/css/tool.css');
        Nova::style('genealabs-laravel-governor', __DIR__ . '/../../../dist/css/vue-multiselect.min.css');
    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return \Illuminate\View\View
     */
    public function renderNavigation()
    {
        return view('genealabs-laravel-governor::navigation');
    }
}
