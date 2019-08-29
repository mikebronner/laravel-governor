<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\HasMany;
use Titasgailius\SearchRelations\SearchesRelations;

class GovernorRole extends Resource
{
    use SearchesRelations;

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
            Text::make("description"),
            HasMany::make("Permissions", "GeneaLabs\LaravelGovernor\Nova\GovernorPermission"),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}
