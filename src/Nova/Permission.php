<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\BelongsTo;

class Permission extends Resource
{
    public static $model = 'GeneaLabs\\LaravelGovernor\\Permission';
    public static $perPageViaRelationship = 25;
    public static $search = [
        "role_name",
        "entity_name",
        "action_name",
        "ownership_name",
    ];
    public static $displayInPermissions = false;
    public static $title = "entity";

    public function fields(Request $request)
    {
        return [
            Text::make("Role", "role_name")
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Action", "action_name")
                ->resolveUsing(function ($actionName) {
                    return "can {$actionName}";
                })
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Ownership", "ownership_name")
                ->onlyOnIndex()
                ->sortable(),
            Text::make("Entity", "entity_name")
                ->onlyOnIndex()
                ->sortable(),
            BelongsTo::make("Role")
                ->hideFromIndex(),
            BelongsTo::make("Action")
                ->hideFromIndex(),
            BelongsTo::make("Ownership")
                ->hideFromIndex(),
            BelongsTo::make("Entity")
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
