<?php

namespace GeneaLabs\LaravelGovernor\View\Components;

use Illuminate\View\Component;

class MenuBar extends Component
{
    public $menuBarItems = [];

    public function __construct()
    {
        $this->menuBarItems = json_decode(json_encode([
            [
                "label" => "Roles",
                "url" => route("genealabs.laravel-governor.roles.index"),
            ],
            [
                "label" => "Groups",
                "url" => route("genealabs.laravel-governor.groups.index"),
            ],
            [
                "label" => "Teams",
                "url" => route("genealabs.laravel-governor.teams.index"),
            ],
            [
                "label" => "Assignments",
                "url" => route("genealabs.laravel-governor.assignments.create"),
            ],
        ]));
    }

    public function render()
    {
        return view('genealabs-laravel-governor::components.menu-bar');
    }
}
