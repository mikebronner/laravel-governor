<?php namespace GeneaLabs\LaravelGovernor\Listeners;

class CreatingListener
{
    public function handle($model)
    {
        if (is_string($model)) {
            $model = collect(explode(': ', $model))->last();
            $model = new $model;
        }

        if (auth()->check() && ! (property_exists($model, 'isGoverned') && $model['isGoverned'] === false)) {
            $model->setAttribute('created_by', auth()->user()->getKey());
        }
    }
}
