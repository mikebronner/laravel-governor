<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CreatingListener
{
    /**
     * Set the `created_by` attribute for any governable model that has not opted out of governance.
     *
     * @param  Model  $event
     */
    public function handle(Model $model)
    {
        if (Auth::check() && ! (property_exists($model, 'isGoverned') && $model['isGoverned'] === false)) {
            $model->setAttribute('created_by', Auth::user()->getKey());
        }
    }
}
