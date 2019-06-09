<?php namespace GeneaLabs\LaravelGovernor\Nova;

use GeneaLabs\LaravelGovernor\PermissionsTool;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Titasgailius\SearchRelations\SearchesRelations;

class Team extends Resource
{
    use SearchesRelations;

    public static $model;
    public static $title = "name";
    public static $search = [
        "description",
        "name",
    ];

    public function fields(Request $request) : array
    {
        return [
            Text::make("Name")
                ->sortable(),
            Text::make("Description"),
            BelongsTo::make("Owner", "ownedBy", "GeneaLabs\LaravelGovernor\Nova\User")
                ->withMeta([
                    "belongsToId" => $this->governor_owned_by
                        ?: auth()->user()->id,
                ])
                ->searchable()
                ->prepopulate()
                ->hideFromIndex(),
            Text::make("Owner", "governor_owned_by")
                ->resolveUsing(function () {
                    if (! $this->ownedBy) {
                        return "";
                    }

                    if (! auth()->user()->can("view", $this->ownedBy)) {
                        return $this->ownedBy->name
                            ?: "";
                    }

                    return "<a href='/dashboard/resources/" . $this->ownedBy->getTable() . "/" . $this->ownedBy->getRouteKey() . "' class='no-underline dim text-primary font-bold'>" . $this->ownedBy->name . '</a>';
                })
                ->asHtml()
                ->onlyOnIndex()
                ->sortable(),

            BelongsToMany::make("Members", "members", "GeneaLabs\LaravelGovernor\Nova\User"),
            HasMany::make("Invitations", "invitations", "GeneaLabs\LaravelGovernor\Nova\TeamInvitation"),
            PermissionsTool::make()
                ->canSee(function () {
                    return $this->governor_owned_by === auth()->user()->id;
                }),
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
