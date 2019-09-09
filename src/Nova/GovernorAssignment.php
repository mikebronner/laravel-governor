<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsToMany;

class GovernorAssignment extends Resource
{
    public static $model;
    public static $title = "name";
    public static $search = [
        // not searchable
    ];

    public function fields(Request $request)
    {
        return [
            Text::make("name")
                ->sortable(),
            BelongsToMany::make("Users", "GeneaLabs\LaravelGovernor\Nova\GovernorUser"),
        ];
    }
}
