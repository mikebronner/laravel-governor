<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;

class GovernorOwnership extends Resource
{
    public static $model;
    public static $title = "name";
    public static $displayInPermissions = false;
    public static $globallySearchable = false;

    public function fields(Request $request)
    {
        return [
            Text::make("name")
                ->sortable(),
            // HasMany::make("Permissions"),
        ];
    }
}
