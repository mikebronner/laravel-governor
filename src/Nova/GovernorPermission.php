<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;

class GovernorPermission extends Resource
{
    public static $model;
    public static $perPageViaRelationship = 25;
    public static $search = [
        // not searchable
    ];
    public static $displayInPermissions = false;
    public static $title = "entity";

    public function fields(Request $request)
    {
        return [
            Text::make("Role", "role_name", "GeneaLabs\LaravelGovernor\Nova\GovernorRole")
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Action", "action_name", "GeneaLabs\LaravelGovernor\Nova\GovernorAction")
                ->resolveUsing(function ($actionName) {
                    return "can {$actionName}";
                })
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Ownership", "ownership_name", "GeneaLabs\LaravelGovernor\Nova\GovernorOwnership")
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Entity", "entity_name", "GeneaLabs\LaravelGovernor\Nova\GovernorEntity")
                ->onlyOnIndex()
                ->sortable(),
            BelongsTo::make("Role", "GeneaLabs\LaravelGovernor\Nova\GovernorRole")
                ->hideFromIndex(),
            BelongsTo::make("Action", "GeneaLabs\LaravelGovernor\Nova\GovernorAction")
                ->hideFromIndex(),
            BelongsTo::make("Ownership", "GeneaLabs\LaravelGovernor\Nova\GovernorOwnership")
                ->hideFromIndex(),
            BelongsTo::make("Entity", "GeneaLabs\LaravelGovernor\Nova\GovernorEntity")
                ->hideFromIndex(),
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
