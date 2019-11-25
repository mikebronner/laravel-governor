<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\HasMany;
use Titasgailius\SearchRelations\SearchesRelations;

class GovernorGroup extends Resource
{
    use SearchesRelations;

    public static $model;
    public static $title = "name";
    public static $globallySearchable = false;

    public function fields(Request $request)
    {
        return [
            Text::make("name")
                ->sortable(),
            HasMany::make("Entities", "entities", "GeneaLabs\LaravelGovernor\Nova\GovernorEntity"),
        ];
    }
}
