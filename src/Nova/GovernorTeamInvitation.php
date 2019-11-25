<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Titasgailius\SearchRelations\SearchesRelations;

class GovernorTeamInvitation extends Resource
{
    use SearchesRelations;

    public static $model;
    public static $displayInPermissions = false;
    public static $title = "email";
    public static $globallySearchable = false;

    public function fields(Request $request) : array
    {
        return [
            Text::make("Email")
                ->sortable(),
            BelongsTo::make("Team", "team", "GeneaLabs\LaravelGovernor\Nova\GovernorTeam"),
        ];
    }
}
