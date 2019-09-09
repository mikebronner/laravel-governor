<?php namespace GeneaLabs\LaravelGovernor\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Gravatar;
use Laravel\Nova\Fields\Text;

class GovernorUser extends Resource
{
    public static $model;
    public static $title = "name";
    public static $search = [
        "name",
    ];
    public static $displayInPermissions = false;

    public function fields(Request $request)
    {
        return [
            Gravatar::make(),
            Text::make('Name')
                ->sortable()
                ->rules('required', 'max:255'),
        ];
    }
}
