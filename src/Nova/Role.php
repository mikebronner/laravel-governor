<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Fields\HasMany;
use Titasgailius\SearchRelations\SearchesRelations;

class Role extends Resource
{
    use SearchesRelations;

    public static $model = 'GeneaLabs\\LaravelGovernor\\Role';
    public static $title = "name";
    public static $search = [
        "description",
        "name",
    ];

    public function fields(Request $request)
    {
        return [
            Text::make("name")
                ->sortable(),
            Text::make("description"),
            HasMany::make("Permissions"),
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
