<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Titasgailius\SearchRelations\SearchesRelations;

class Team extends Resource
{
    use SearchesRelations;

    public static $model = 'GeneaLabs\\LaravelGovernor\\Team';
    public static $title = "name";
    public static $search = [
        "description",
        "name",
    ];

    public function fields(Request $request) : array
    {
        return [
            ID::make("Id")
                ->sortable(),
            Text::make("Name")
                ->sortable(),
            Text::make("Description"),
            BelongsTo::make("Owner", "governor_owned_by", "GeneaLabs\LaravelGovernor\Nova\User"),
            BelongsToMany::make("Members", "members", "GeneaLabs\LaravelGovernor\Nova\User"),
            HasMany::make("Invitations", "invitations", "GeneaLabs\LaravelGovernor\Nova\TeamInvitation"),

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
