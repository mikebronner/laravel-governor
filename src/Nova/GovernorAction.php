<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;

class GovernorAction extends Resource
{
    public static $model;
    public static $title = "name";
    public static $search = [
        // not searchable
    ];
    public static $displayInPermissions = false;

    public function fields(Request $request)
    {
        return [
            Text::make("name")
                ->sortable(),
            // HasMany::make("Permissions"),
        ];
    }
}
