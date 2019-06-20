<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Titasgailius\SearchRelations\SearchesRelations;

class TeamInvitation extends Resource
{
    use SearchesRelations;

    public static $model;
    public static $displayInPermissions = false;
    public static $title = "email";
    public static $search = [
        // not searchable
    ];

    public function fields(Request $request) : array
    {
        return [
            Text::make("Email")
                ->sortable(),
            BelongsTo::make("Team"),
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
